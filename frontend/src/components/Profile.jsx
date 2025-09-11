import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { motion } from 'framer-motion';
import SavedJobsTable from './SavedJobsTable';
import Footer from './shared/Footer';

const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <>

            <motion.div
                initial={ { opacity: 0 } }
                animate={ { opacity: 1 } }
                transition={ { duration: 0.5 } }
                className="pb-4 bg-gradient-to-br from-[#00040A] to-[#001636] text-gray-300"
            >
                <Navbar />
                {/* Main container with padding adjustment for navbar */ }
                <div className="pt-20 max-w-4xl mx-auto px-6">
                    {/* Profile Information */ }
                    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-md p-6 my-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={ user?.profile?.profilePhoto ? user?.profile?.profilePhoto : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq8T0hZUoX8kuRi3EZpZbUDtZ_WqqN9Ll15Q&s' } alt="profile" />
                                </Avatar>
                                <div>
                                    <h1 className="font-medium text-xl text-white">{ user?.fullname }</h1>
                                    <p className="text-gray-400">{ user?.profile?.bio }</p>
                                </div>
                            </div>
                            <Button
                                onClick={ () => setOpen(true) }
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                <Pen className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="my-5 space-y-2">
                            <div className="flex items-center gap-3">
                                <Mail className="text-blue-500" />
                                <span>{ user?.email }</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Contact className="text-blue-500" />
                                <span>{ user?.phoneNumber }</span>
                            </div>
                        </div>
                        <div className="my-5">
                            <h1 className="text-white mb-2">Skills</h1>
                            <div className="flex items-center gap-2 flex-wrap">
                                { user?.profile?.skills.length !== 0 ? (
                                    user?.profile?.skills.map((item, index) => (
                                        <Badge key={ index } className="bg-blue-600 text-white">
                                            { item }
                                        </Badge>
                                    ))
                                ) : (
                                    <span>NA</span>
                                ) }
                            </div>
                        </div>
                        <div className="my-5">
                            <Label className="text-md font-bold text-white">Resume</Label>
                            { isResume ? (
                                <a
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    href={ user?.profile?.resume }
                                    className="text-blue-500 hover:underline"
                                >
                                    { user?.profile?.resumeOriginalName }
                                </a>
                            ) : (
                                <span>NA</span>
                            ) }
                        </div>
                    </div>

                    {/* Applied Jobs Section */ }
                    <div className="bg-gray-800 rounded-2xl shadow-md p-6 my-6">
                        <h1 className="font-bold text-lg text-white mb-4">Applied Jobs</h1>
                        <AppliedJobTable />
                    </div>

                    {/* Saved Jobs Section */ }
                    <div className="bg-gray-800 rounded-2xl shadow-md p-6 my-6">
                        <h1 className="font-bold text-lg text-white mb-4">Saved Jobs</h1>
                        <SavedJobsTable />
                    </div>
                </div>

                {/* Update Profile Dialog */ }
                <UpdateProfileDialog open={ open } setOpen={ setOpen } />
            </motion.div>
            <Footer />
        </>
    );
};

export default Profile;