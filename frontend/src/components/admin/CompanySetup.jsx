import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { COMPANY_API_END_POINT } from '@/utils/constant';

const CompanySetup = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: '', description: '', website: '', location: '', file: null
  });
  const [loading, setLoading] = useState(false);
  const { company, loading: companyLoading, error: companyError } = useGetCompanyById(id);

  useEffect(() => {
    if (!id) {
      toast.error('Invalid company ID.');
      navigate('/admin/companies');
    }
  }, [id, navigate]);

  useEffect(() => {
    if (company) {
      setInput({
        name: company.name || '',
        description: company.description || '',
        website: company.website || '',
        location: company.location || '',
        file: null,
      });
    }
  }, [company]);

  const changeEventHandler = (e) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setInput(prev => ({ ...prev, file }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!id) return toast.error('Invalid company ID.');

    const formData = new FormData();
    Object.entries(input).forEach(([key, val]) => {
      if (key === 'file' && val) formData.append('file', val);
      else formData.append(key, val);
    });

    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/admin/companies');
      } else {
        toast.error(res.data.message || 'Failed to update company.');
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Server error while updating company.');
    } finally {
      setLoading(false);
    }
  };

  if (companyLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      <span className="ml-2 text-blue-600">Loading company data...</span>
    </div>;
  }

  if (companyError) {
    return <div className="text-center mt-10 text-red-600">
      <p>Error loading company data: {companyError}</p>
      <Button onClick={() => window.location.reload()} variant="outline" className="mt-4">Retry</Button>
    </div>;
  }

  return (
    <motion.div className="bg-white min-h-screen" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Navbar />
      <div className="max-w-xl mx-auto my-10 p-5 bg-gray-50 rounded-lg shadow">
        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="flex items-center gap-5 mb-6">
            <Button onClick={() => navigate('/admin/companies')} variant="outline" type="button">
              <ArrowLeft />
            </Button>
            <h1 className="text-xl font-bold text-blue-600">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input name="name" value={input.name} onChange={changeEventHandler} required />
            </div>
            <div>
              <Label>Description</Label>
              <Input name="description" value={input.description} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Website</Label>
              <Input name="website" value={input.website} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Location</Label>
              <Input name="location" value={input.location} onChange={changeEventHandler} />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/*" onChange={changeFileHandler} />
            </div>
          </div>
          <Button type="submit" className="w-full mt-6 bg-blue-500 text-white" disabled={loading}>
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...</> : 'Update'}
          </Button>
        </form>
      </div>
      <Footer />
    </motion.div>
  );
};

export default CompanySetup;
