import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from './ui/button';
import { BookmarkPlus, ArrowUpRight } from 'lucide-react';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job.id}`)}
      className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        {/* Header with Company Logo */}
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img
              src={job?.company?.logo || 'https://via.placeholder.com/50'}
              alt={job?.company?.name || 'Company Logo'}
              className="w-12 h-12 rounded-full"
            />
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-white">
                {job?.title || 'Job Title'}
              </h3>
              <p className="text-gray-400">{job?.company?.name || 'Company Name'}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <BookmarkPlus className="h-5 w-5 text-gray-400" />
          </Button>
        </div>

        {/* Job Details */}
        <div className="mt-4">
          <div className="flex items-center text-gray-400 mb-2">
            <Badge variant="secondary" className="mr-2">
              {job?.jobType || 'Job Type'}
            </Badge>
            <span className="text-sm">{job?.location || 'Location'}</span>
          </div>
          <p className="text-gray-300 font-medium">
            {job?.salary ? `${job.salary} LPA` : 'Not disclosed'}
          </p>

          {/* Footer with Date and Details Button */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-400">{job?.position} Positions</span>
            <Link to={`/description/${job.id}`}>
              <Button variant="ghost" size="sm" className="text-blue-500">
                Details
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
