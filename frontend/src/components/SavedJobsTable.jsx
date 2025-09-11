import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCaption, TableCell, TableHeader, TableRow } from './ui/table';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

const SavedJobsTable = () => {
    const { savedJobs } = useSelector(store => store.auth);

    return (
        <motion.div
            initial={ { opacity: 0, y: 20 } }
            animate={ { opacity: 1, y: 0 } }
            transition={ { duration: 0.5 } }
        >
            <div className="overflow-x-auto">
                <Table className="table-auto w-full border border-gray-700 rounded-lg bg-gray-800 text-gray-200">
                    <TableHeader>
                        <TableRow className="bg-gray-900 text-gray-200">
                            <TableCell className="border-b border-gray-700 px-4 py-3">Title</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">Location</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">Salary</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">No. of Positions</TableCell>
                            <TableCell className="border-b border-gray-700 px-4 py-3">View</TableCell>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        { savedJobs?.map((job, index) => (
                            <motion.tr
                                key={ index }
                                className="hover:bg-gray-700 transition-colors duration-300"
                                initial={ { opacity: 0, y: 10 } }
                                animate={ { opacity: 1, y: 0 } }
                                transition={ { duration: 0.3, delay: index * 0.1 } }
                            >
                                <TableCell className="border-b border-gray-700 px-4 py-3">
                                    { job?.title }
                                </TableCell>
                                <TableCell className="border-b border-gray-700 px-4 py-3">
                                    { job?.location }
                                </TableCell>
                                <TableCell className="border-b border-gray-700 px-4 py-3">
                                    { job?.salary }
                                </TableCell>
                                <TableCell className="border-b border-gray-700 px-4 py-3">
                                    { job?.position }
                                </TableCell>
                                <TableCell className="border-b border-gray-700 px-4 py-3">
                                    <Link to={ `/description/${job?._id}` }>
                                        <Eye className="text-gray-400 hover:text-gray-200 transition-colors duration-300" />
                                    </Link>
                                </TableCell>
                            </motion.tr>
                        )) }
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
};

export default SavedJobsTable;