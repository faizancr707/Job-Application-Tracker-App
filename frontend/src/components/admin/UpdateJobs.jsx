import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from '../shared/Footer';

const UpdateJobs = () => {
    const { id: jobId } = useParams();

    const navigate = useNavigate();
    const [input, setInput] = useState({
        title: '',
        description: '',
        requirements: '',
        salary: '',
        location: '',
        jobType: '',
        experience: '',
        position: 0,
        companyId: '',
    });
    const [loading, setLoading] = useState(false);
    const [companies, setCompanies] = useState([]);
    // Fetch job details
    useEffect(() => {
        const fetchJobDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`);
                setInput(response.data.job);
            } catch (error) {
                toast.error('Failed to fetch job details. Please try again.');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobDetails();
    }, [jobId]);


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        setInput({ ...input, companyId: value });
    };

    // Handle form submission for updating job
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.put(`${JOB_API_END_POINT}/update`, { ...input, jobId });
            toast.success('Job updated successfully!');
            navigate('/jobs'); // Redirect to jobs list page
        } catch (error) {
            toast.error('Failed to update the job. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Handle job deletion
    const handleDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`${JOB_API_END_POINT}/delete`, { data: { jobId } });
            toast.success('Job deleted successfully!');
            navigate('/jobs'); // Redirect to jobs list page
        } catch (error) {
            toast.error('Failed to delete the job. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white min-h-screen">
            <Navbar />
            <motion.div
                className="flex items-center justify-center w-full my-5 pt-10"
                initial={ { opacity: 0, y: -20 } }
                animate={ { opacity: 1, y: 0 } }
                transition={ { duration: 0.6 } }
            >
                <form
                    onSubmit={ submitHandler }
                    className="p-8 max-w-4xl w-full bg-white border border-blue-300 shadow-lg rounded-md"
                >
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        initial={ { opacity: 0 } }
                        animate={ { opacity: 1 } }
                        transition={ { duration: 0.7 } }
                    >
                        {/* Input fields */ }
                        { Object.entries(input).map(([key, value]) => (
                            key !== 'companyId' && (
                                <div key={ key }>
                                    <Label>
                                        { key.charAt(0).toUpperCase() + key.slice(1) }{ ' ' }
                                        <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        type={ typeof value === 'number' ? 'number' : 'text' }
                                        name={ key }
                                        value={ value }
                                        onChange={ changeEventHandler }
                                        className="my-1 border-blue-300 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            )
                        )) }
                        { companies.length > 0 && (
                            <div>
                                <Label>
                                    Company <span className="text-red-500">*</span>
                                </Label>
                                <Select
                                    onValueChange={ selectChangeHandler }
                                    defaultValue={ input.companyId || '' }
                                >
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            { companies.map((company) => (
                                                <SelectItem
                                                    key={ company._id }
                                                    value={ company._id }
                                                >
                                                    { company.name }
                                                </SelectItem>
                                            )) }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        ) }
                    </motion.div>
                    { loading ? (
                        <Button className="w-full my-4 bg-blue-500 text-white">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <>
                            <Button
                                type="submit"
                                className="w-full my-4 bg-blue-500 hover:bg-blue-600 text-white transition duration-300"
                            >
                                Update Job
                            </Button>
                            <Button
                                type="button"
                                onClick={ handleDelete }
                                className="w-full my-4 bg-red-500 hover:bg-red-600 text-white transition duration-300"
                            >
                                Delete Job
                            </Button>
                        </>
                    ) }
                    { companies.length === 0 && (
                        <p className="text-xs text-red-600 font-bold text-center my-3">
                            *Please register a company first, before updating jobs.
                        </p>
                    ) }
                </form>
            </motion.div>
            <Footer />
        </div>
    );
};

export default UpdateJobs;