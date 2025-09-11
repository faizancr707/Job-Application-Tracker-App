import { setAllJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        // Construct query parameters only, no /get segment
        const queryParam = searchedQuery ? `?keyword=${searchedQuery}` : '';
        const response = await axios.get(`${JOB_API_END_POINT}/${queryParam}`, {
          withCredentials: true,
        });

        if (response?.data?.success) {
          dispatch(setAllJobs(response.data.jobs));
        }
      } catch (error) {
        // Optionally handle error or log it
        console.error('Error fetching jobs:', error);
      }
    };

    fetchAllJobs();
  }, [searchedQuery, dispatch]);
};

export default useGetAllJobs;
