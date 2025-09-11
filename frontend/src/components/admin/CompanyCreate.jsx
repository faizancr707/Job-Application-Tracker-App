import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import Footer from '../shared/Footer';

const CompanyCreate = () => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState('');
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error('Company name is required.');
      return;
    }

    try {
      const res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      console.log('📦 Company creation response:', res.data); // Debug log

      const company = res?.data?.company;
      const companyId = company?.id; // ✅ use 'id' from response

      if (res?.data?.success && company && companyId) {
        dispatch(setSingleCompany(company));
        toast.success(res.data.message || 'Company created successfully!');
        navigate(`/admin/companies/${companyId}`); // ✅ navigate with correct ID
      } else {
        toast.error('Invalid response from server. Company ID missing.');
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Failed to create company. Please try again.';
      toast.error(msg);
    }
  };

  return (
    <motion.div
      className="bg-white min-h-screen"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Navbar />
      <div className="max-w-4xl mx-auto my-10 p-5">
        <h1 className="font-bold text-2xl text-blue-600">Your Company Name</h1>
        <p className="text-gray-500 mb-4">You can change this later.</p>
        <Label>Company Name</Label>
        <Input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="JobHunt, Microsoft etc."
          className="my-2 border border-gray-300 rounded-md"
        />
        <div className="flex gap-2 mt-6">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/companies')}
          >
            Cancel
          </Button>
          <Button
            onClick={registerNewCompany}
            className="bg-blue-500 text-white"
          >
            Continue
          </Button>
        </div>
      </div>
      <Footer />
    </motion.div>
  );
};

export default CompanyCreate;

