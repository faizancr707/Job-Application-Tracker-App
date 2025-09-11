
import { useEffect, useState } from 'react';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';

const useGetCompanyById = (id) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) {
      setError('No company ID provided');
      setLoading(false);
      return;
    }

    const fetchCompany = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${id}`, { withCredentials: true });
        if (res.data.success) {
          setCompany(res.data.company);
        } else {
          setError(res.data.message || 'Company not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch company');
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  return { company, loading, error };
};

export default useGetCompanyById;
