import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  const jobsList = Array.isArray(allJobs) ? allJobs : [];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      <motion.h1
        className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        aria-label="Latest and Top Job Openings"
      >
        <span>Latest & Top</span> Job Openings
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {jobsList.length === 0 ? (
          <motion.span
            key="no-jobs-message"
            className="text-center text-lg text-gray-500 col-span-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            No Jobs Available
          </motion.span>
        ) : (
          jobsList.slice(0, 6).map((job, index) => (
            <motion.div
              key={job.id ?? index}
              variants={cardVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default LatestJobs;
