import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import CompaniesTable from './CompaniesTable';
import { useNavigate } from 'react-router-dom';
import useGetAllCompanies from '@/hooks/useGetAllCompanies';
import { useDispatch } from 'react-redux';
import { setSearchCompanyByText } from '@/redux/companySlice';
import Footer from '../shared/Footer';

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <motion.div className="bg-white min-h-screen " initial={ { opacity: 0 } } animate={ { opacity: 1 } } transition={ { duration: 0.5 } }>
            <Navbar />
            <div className="max-w-6xl mx-auto my-10 p-5">
                <div className="flex items-center justify-between my-5">
                    <Input
                        className="w-fit p-2 border border-gray-300 rounded-md shadow-sm transition-all duration-300 focus:border-blue-400"
                        placeholder="Filter by name"
                        onChange={ (e) => setInput(e.target.value) }
                    />
                    <Button
                        onClick={ () => navigate("/admin/companies/create") }
                        className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition-all duration-300"
                    >
                        New Company
                    </Button>
                </div>
                <CompaniesTable />
            </div>
            <Footer />
        </motion.div>
    );
};

export default Companies;