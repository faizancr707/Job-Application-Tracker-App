import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import Footer from '../shared/Footer';

const AdminJobs = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useGetAllAdminJobs();

  useEffect(() => {
    // Update the search term in Redux whenever input changes
    dispatch(setSearchJobByText(input));
  }, [input, dispatch]);

  return (
    <>
      <motion.div
        initial={ { opacity: 0 } }
        animate={ { opacity: 1 } }
        transition={ { duration: 0.5 } }
      >
        <Navbar />
        <div className='max-w-6xl mx-auto my-10 p-5'>
          <motion.div
            className='flex items-center justify-between my-5'
            initial={ { y: -20, opacity: 0 } }
            animate={ { y: 0, opacity: 1 } }
            transition={ { duration: 0.5 } }
          >
            <Input
              className="w-fit"
              placeholder="Filter by name, role"
              onChange={ (e) => setInput(e.target.value) }
            />
            <Button
              className='bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300'
              onClick={ () => navigate("/admin/jobs/create") }
            >
              New Job
            </Button>
          </motion.div>
          <AdminJobsTable />
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default AdminJobs;