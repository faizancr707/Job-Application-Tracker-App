// Applicants.jsx
import React, { useEffect } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant'; // Ensure correct path
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { motion } from 'framer-motion';
import Footer from '../shared/Footer';

const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  useEffect(() => {
    console.log('Route params.id:', params.id); // Debug log to verify ID presence

    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        dispatch(setAllApplicants(res.data.job));
      } catch (error) {
        console.error("Failed to fetch applicants:", error);
      }
    };

    if (params.id) {
      fetchAllApplicants();
    } else {
      console.warn("No params.id found. Cannot fetch applicants.");
    }
  }, [params.id, dispatch]);

  return (
    <div>
      <Navbar />
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-bold text-2xl my-5 text-blue-600">
          Applicants ({applicants?.applications?.length || 0})
        </h1>
        <ApplicantsTable />
      </motion.div>
      <Footer />
    </div>
  );
};

export default Applicants;
