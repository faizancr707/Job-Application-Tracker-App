import React from 'react';
import { motion } from 'framer-motion';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ['Accepted', 'Rejected'];

const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const ApplicantsTable = () => {
    const { applicants } = useSelector((store) => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    return (
        <motion.div
            initial={ { opacity: 0 } }
            animate={ { opacity: 1 } }
            transition={ { duration: 0.6 } }
        >
            <Table className="bg-white shadow-md rounded-lg">
                <TableCaption className="text-blue-600">A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-blue-500">FullName</TableHead>
                        <TableHead className="text-blue-500">Email</TableHead>
                        <TableHead className="text-blue-500">Contact</TableHead>
                        <TableHead className="text-blue-500">Resume</TableHead>
                        <TableHead className="text-blue-500">Date</TableHead>
                        <TableHead className="text-right text-blue-500">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    { applicants?.applications?.map((item, index) => (
                        <motion.tr
                            key={ item._id }
                            variants={ tableRowVariants }
                            initial="hidden"
                            animate="visible"
                            transition={ { delay: index * 0.1 } }
                            className="hover:bg-blue-50"
                        >
                            <TableCell>{ item?.applicant?.fullname }</TableCell>
                            <TableCell>{ item?.applicant?.email }</TableCell>
                            <TableCell>{ item?.applicant?.phoneNumber }</TableCell>
                            <TableCell>
                                { item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 cursor-pointer"
                                        href={ item?.applicant?.profile?.resume }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        { item?.applicant?.profile?.resumeOriginalName }
                                    </a>
                                ) : (
                                    <span>NA</span>
                                ) }
                            </TableCell>
                            <TableCell>{ item?.applicant.createdAt.split('T')[0] }</TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32">
                                        { shortlistingStatus.map((status, index) => (
                                            <motion.div
                                                key={ index }
                                                onClick={ () => statusHandler(status, item?._id) }
                                                whileHover={ { scale: 1.05 } }
                                                className={ `${status === "Accepted" ? "text-green-700" : "text-red-700"} flex w-fit items-center my-2 cursor-pointer text-blue-500` }
                                            >
                                                <span>{ status }</span>
                                            </motion.div>
                                        )) }
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    )) }
                </TableBody>
            </Table>
        </motion.div>
    );
};

export default ApplicantsTable;