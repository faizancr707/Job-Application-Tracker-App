import React, { useState } from 'react';
import { Button } from './ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Input } from './ui/input';
import { toast } from 'sonner';

const HeroSection = () => {
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = (e) => {
        e.preventDefault();
        dispatch(setSearchedQuery(query));
        navigate('/browse');
    };

    const handleNavigation = () => {
        toast.success('Please Login into Recruiter AAccount  ')
        navigate('/signup')
    }
    return (
        <div className="relative overflow-hidden pt-16 bg-gradient-to-br from-[#00040A] to-[#001636] min-h-screen text-white px-6 py-16">
            {/* Gradient Background */ }
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMwMDAwMDAiIHN0b3Atb3BhY2l0eT0iMC4xIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNMCAwaDIwMHYyMDBIMHoiIGZpbGw9InVybCgjZykiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

            <motion.h1
                className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 text-center tracking-tight user-select text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
                initial={ { opacity: 0, scale: 0.85 } }
                whileInView={ { opacity: 1, scale: 1 } }
                transition={ { duration: 0.7 } }
                viewport={ { once: true } }
            >
                Find Your Dream Job With HireHub
                {/* <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text user-select">

                </span> */}
            </motion.h1>

            <motion.p
                className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed text-center user-select"
                initial={ { opacity: 0 } }
                whileInView={ { opacity: 1 } }
                transition={ { delay: 0.3, duration: 0.6 } }
                viewport={ { once: true } }
            >
                Connect with top employers and discover opportunities that match your skills and aspirations. Your next career move starts here.
            </motion.p>

            <div className="flex justify-center gap-6 mb-10">
                <Button
                    size="lg"
                    className=" bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 px-8 py-4 rounded-full flex items-center text-lg cursor-pointer"
                    onClick={ () => navigate('/jobs') }
                >
                    Find Jobs
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                    onClick={ handleNavigation }
                    size="lg"
                    variant="outline"
                    className="border border-gray-600 text-white hover:bg-gray-800 bg-transparent px-8 py-4 rounded-full text-lg cursor-pointer"
                >
                    Post a Job
                </Button>
            </div>

            <motion.div
                className="flex w-full sm:w-[70%] lg:w-[50%] shadow-md border border-gray-700 pl-3 pr-2 py-2 rounded-full items-center gap-4 mx-auto bg-[#001636] bg-opacity-90"
                initial={ { opacity: 0, y: 50 } }
                whileInView={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.8 } }
                viewport={ { once: true } }
            >
                <Input
                    type="text"
                    value={ query }
                    placeholder="Search by job title or skills"
                    onChange={ (e) => setQuery(e.target.value) }
                    className="w-full p-3 outline-none border-none bg-transparent text-white placeholder-gray-400 rounded-full focus:ring-2 focus:ring-blue-500"
                />

                <Button
                    onClick={ searchJobHandler }
                    className="rounded-full bg-gradient-to-r from-blue-400 to-purple-500 text-white hover:from-blue-500 hover:to-purple-600 px-6 py-3 flex items-center"
                >
                    <Search className="h-5 w-5 mr-2" />
                    Search
                </Button>
            </motion.div>
        </div>
    );
};

export default HeroSection;