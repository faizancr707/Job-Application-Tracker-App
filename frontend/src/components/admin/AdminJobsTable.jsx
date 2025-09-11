import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Delete, Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setAllJobs } from '@/redux/jobSlice'

const AdminJobsTable = () => {
    const dispatch = useDispatch()
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();


    const handleDeleteJob = async (jobId) => {
        try {
            if (!jobId) {
                toast.error('Job ID is missing');
                return;
            }
            axios.defaults.withCredentials = true;
            const response = await axios.post(`${JOB_API_END_POINT}/delete`, { jobId });

            // Update Redux state
            dispatch(setAllJobs(response.data.remainingJobs));

            // Trigger re-filtering
            setFilterJobs(response.data.remainingJobs);

            toast.success(response.data.message);
        } catch (error) {
            console.error('Error deleting job:', error);
            toast.error(error.response?.data?.message || 'Error deleting the job');
        }
    };


    useEffect(() => {
        setFilterJobs(allAdminJobs.filter((job) => {
            if (!searchJobByText) return true;
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());
        }));
    }, [allAdminJobs, searchJobByText]);


    return (
        <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            transition={ { duration: 0.5 } }
            className="overflow-x-auto"
        >
            <Table className="border border-blue-300 rounded-xl min-w-full">
                <TableCaption className="text-center">A list of your recently posted jobs</TableCaption>
                <TableHeader>

                    <TableRow>
                        <TableHead className="py-4 px-6">Company Name</TableHead>
                        <TableHead className="py-4 px-6">Role</TableHead>
                        <TableHead className="py-4 px-6">Date</TableHead>
                        <TableHead className="py-4 px-6 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { filterJobs?.map((job) => (
                        <motion.tr
                            key={ job._id }
                            initial={ { opacity: 0 } }
                            animate={ { opacity: 1 } }
                            transition={ { duration: 0.3 } }
                            className="hover:bg-blue-100 border-t border-gray-200"
                        >
                            <TableCell className="py-4 px-6 whitespace-nowrap">{ job?.company?.name }</TableCell>
                            <TableCell className="py-4 px-6 whitespace-nowrap">{ job?.title }</TableCell>
                            <TableCell className="py-4 px-6 whitespace-nowrap">{ job?.createdAt.split("T")[0] }</TableCell>
                            <TableCell className="py-4 px-6 text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-blue-600 hover:text-blue-500" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-white shadow-md rounded-md">
                                        <div
                                            onClick={ () => navigate(`/admin/jobs/${job._id}/update`) }
                                            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-500 p-2"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                        <div
                                            onClick={ () => navigate(`/admin/jobs/${job._id}/applicants`) }
                                            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-500 p-2"
                                        >
                                            <Eye className="w-4" />
                                            <span>Applicants</span>
                                        </div>

                                        <div
                                            onClick={ () => handleDeleteJob(job?._id) }
                                            className="flex items-center gap-2 cursor-pointer text-blue-600 hover:text-blue-500 p-2"
                                        >
                                            <Delete className="w-4" />
                                            <span>Delete</span>
                                        </div>
                                    </PopoverContent>s
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    )) }
                </TableBody>
            </Table>
        </motion.div>
    );
}

export default AdminJobsTable;