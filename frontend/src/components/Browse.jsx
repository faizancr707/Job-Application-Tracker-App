import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import Footer from './shared/Footer';

const Browse = () => {
  useGetAllJobs();
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white bg-gradient-to-br from-[#00040A] to-[#001636]">
        <Navbar />
        <div className="max-w-7xl mx-auto pt-16 px-4">
          <h1 className="font-bold text-xl my-10">
            Search Results ({allJobs.length})
          </h1>

          {searchedQuery === '' && allJobs.length === 0 ? (
            <p className="text-lg text-gray-400">
              No jobs found. Please adjust your search criteria.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {allJobs.length > 0 ? (
                allJobs.map((job) => {
                  if (!job || !job._id) {
                    console.warn('⚠️ Skipping job due to missing _id:', job);
                    return null; // skip rendering if job is malformed
                  }

                  return <Job key={job._id} job={job} />;
                })
              ) : (
                <p>No jobs found.</p>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Browse;
