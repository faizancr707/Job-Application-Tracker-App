import React from 'react';
import { Button } from './ui/button';
import { BookmarkPlus, ArrowUpRight } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { setsavedJobs } from '@/redux/authSlice';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { Card } from '@/components/ui/card';
import axios from 'axios';

const Job = ({ job }) => {
    const { savedJobs } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // fixed calculation
    };

    const handleSaveForLater = async (jobId) => {
        try {
            const response = await axios.post(
                `${USER_API_END_POINT}/savedjob`,
                { jobId },
                { withCredentials: true }
            );
            if (response) {
                dispatch(setsavedJobs(response.data.savedJobs));
                toast.success(response.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving job');
        }
    };

    return (
        <motion.div
            className="flex items-stretch gap-4 p-4"
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, duration: 0.9 }}
        >
            <Card key={job.id} className="bg-gray-900 border-gray-800 w-full p-6 rounded-lg shadow-md">
                <div className="flex items-start justify-between">
                    <div className="flex items-center">
                        <Avatar>
                            <AvatarImage src={job?.company?.logo} alt={job?.company?.name} />
                        </Avatar>
                        <div className="ml-4">
                            <h3 className="text-lg font-semibold text-white">{job?.title}</h3>
                            <p className="text-gray-400">{job?.company?.name}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleSaveForLater(job.id)}
                        style={{ zIndex: 999 }}
                    >
                        <BookmarkPlus className="h-5 w-5 text-gray-400" />
                    </Button>
                </div>

                <div className="mt-4">
                    <div className="flex items-center text-gray-400 mb-2">
                        <Badge variant="secondary" className="mr-2">{job?.position} Positions</Badge>
                        <span className="text-sm">{job?.location}</span>
                    </div>
                    <p className="text-gray-300 font-medium"> ₹ {job?.salary} LPA</p>

                    <div className="mt-4 flex items-center justify-between">
                        {
                            savedJobs?.some(savedJob => savedJob.id?.toString() === job?.id?.toString()) ?
                                <Button className="bg-green-500 text-white text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4">
                                    Saved Already
                                </Button> :
                                <Button
                                    className="bg-blue-700 text-white text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4"
                                    onClick={() => handleSaveForLater(job.id)}
                                >
                                    Save For Later
                                </Button>
                        }

                        <span className="text-xs sm:text-sm text-gray-400">
                            {daysAgoFunction(job?.createdAt) === 0
                                ? 'Today'
                                : `${daysAgoFunction(job?.createdAt)} days ago`}
                        </span>

                        <Button
                            className="text-blue-400 text-xs sm:text-sm py-1 sm:py-2 px-3 sm:px-4"
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/description/${job?.id}`)}
                        >
                            Details
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
};

export default Job;
