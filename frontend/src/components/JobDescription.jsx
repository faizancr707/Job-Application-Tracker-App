import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, Building, Clock, IndianRupeeIcon } from 'lucide-react';
import { USER_API_END_POINT, JOB_API_END_POINT, APPLICATION_API_END_POINT } from '@/utils/constant';
import { setsavedJobs } from '@/redux/authSlice';
import { setSingleJob } from '@/redux/jobSlice'; // Assuming you need to import this action


const JobDescription = () => {
    const { id: jobId } = useParams();
    const dispatch = useDispatch();
    const { savedJobs, user } = useSelector((store) => store.auth);
    const { singleJob } = useSelector((store) => store.job);

    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/${jobId}`, { withCredentials: true });
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(
                        res.data.job.applications.some((application) => application.applicant === user?._id)
                    );
                }
            } catch (error) {
                console.error('Error fetching job details:', error);
            }
        };
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);

    const applyJobHandler = async () => {
        try {
            const res = await axios.post(
                `${APPLICATION_API_END_POINT}/apply/${jobId}`,
                {},
                { withCredentials: true }
            );

            if (res.data.success) {
                setIsApplied(true);
                dispatch(
                    setSingleJob({
                        ...singleJob,
                        applications: [...singleJob.applications, { applicant: user?._id }],
                    })
                );
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An error occurred while applying');
        }
    };

    const handleSaveForLater = async () => {
        try {
            const res = await axios.post(
                `${USER_API_END_POINT}/savedjob`,
                { jobId },
                { withCredentials: true }
            );
            if (res.data.success) {
                dispatch(setsavedJobs(res.data.savedJobs));
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error saving job');
        }
    };

    return (
        <>
            <Navbar />
            <main className="pt-20 pb-16 bg-gradient-to-br from-[#00040A] to-[#001636] min-h-screen text-white px-4 sm:px-6">
                <div className="max-w-4xl mx-auto">
                    <Card className="bg-gray-900 border-gray-800 p-4 sm:p-8">
                        {/* Job Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                            <div className="mb-4 sm:mb-0">
                                <h1 className="text-xl sm:text-2xl font-bold text-white">{singleJob?.title || 'Job Title'}</h1>
                                <p className="text-sm sm:text-base text-gray-400">{singleJob?.location || 'Location not specified'}</p>
                            </div>
                            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
                                {savedJobs?.some((savedJob) => savedJob._id === singleJob?._id) ? (
                                    <Button className="w-full sm:w-auto bg-green-500 text-white text-xs sm:text-sm">Saved Already</Button>
                                ) : (
                                    <Button
                                        className="w-full sm:w-auto bg-blue-700 text-white text-xs sm:text-sm"
                                        onClick={handleSaveForLater}
                                    >
                                        Save For Later
                                    </Button>
                                )}
                                <Button
                                    className={`w-full sm:w-auto rounded-lg px-4 py-2 sm:px-6 sm:py-3 text-xs sm:text-sm ${
                                        isApplied
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                                    }`}
                                    onClick={isApplied ? null : applyJobHandler}
                                    disabled={isApplied}
                                >
                                    {isApplied ? 'Already Applied' : 'Apply Now'}
                                </Button>
                            </div>
                        </div>

                        {/* Job Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 mt-6">
                            <div className="flex items-center text-xs sm:text-base text-gray-300">
                                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                {singleJob?.location || 'Location not specified'}
                            </div>
                            <div className="flex items-center text-xs sm:text-base text-gray-300">
                                <Building className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                {singleJob?.jobType || 'Job Type not specified'}
                            </div>
                            <div className="flex items-center text-xs sm:text-base text-gray-300">
                                <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                {singleJob?.createdAt?.split('T')[0] || 'Not specified'}
                            </div>
                            <div className="flex items-center text-xs sm:text-base text-gray-300">
                                <IndianRupeeIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                                {singleJob?.salary?.length === 0 ? 'Not Disclosed' : `${singleJob?.salary} LPA`}
                            </div>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Job Description</h2>
                            <p className="text-xs sm:text-base text-gray-300">{singleJob?.description || 'Description not available'}</p>
                        </div>

                        <div className="mt-6 sm:mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Requirements</h2>
                            <p className="text-xs sm:text-base text-gray-300">{singleJob?.requirements || 'Description not available'}</p>
                        </div>

                        {/* Experience */}
                        <div className="mt-6 sm:mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Experience Required</h2>
                            <p className="text-xs sm:text-base text-gray-300">{`${singleJob?.experienceLevel} years` || 'Not specified'}</p>
                        </div>

                        {/* Applications */}
                        <div className="mt-6 sm:mt-8">
                            <h2 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">Applications</h2>
                            <p className="text-xs sm:text-base text-gray-300">
                                {singleJob?.applications?.length || 0} applicants
                            </p>
                        </div>
                    </Card>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default JobDescription;
