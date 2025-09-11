import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: '',
    email: '',
    phoneNumber: '',
    password: '',
    role: '',
  });

  const [profilePicture, setProfilePicture] = useState(null);

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle text input changes
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Handle profile image file input
  const profilePictureHandler = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  // Form submission
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation
    if (!input.fullname || !input.email || !input.phoneNumber || !input.password || !input.role) {
      return toast.error("All fields are required.");
    }

    try {
      dispatch(setLoading(true));
      const formData = new FormData();

      Object.keys(input).forEach((key) => {
        formData.append(key, input[key]);
      });

      if (profilePicture) {
        formData.append('file', profilePicture);
      }

      const res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.error('Signup Error:', error);
      toast.error(error?.response?.data?.message || "Server Error");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      <motion.div
        className="flex justify-center items-center min-h-screen pt-16 bg-gradient-to-r from-[#00040A] to-[#001636]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full max-w-md p-8 bg-gray-900 border-gray-800 shadow-lg rounded-lg border text-white"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.h1
            className="font-bold text-3xl mb-6 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sign Up
          </motion.h1>

          <form onSubmit={submitHandler}>
            {/* Full Name */}
            <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
              <Label htmlFor="fullname" className="block text-lg">
                Full Name <span className="text-red-400">*</span>
              </Label>
              <Input
                id="fullname"
                type="text"
                name="fullname"
                placeholder="Faizan Alam"
                value={input.fullname}
                onChange={changeEventHandler}
                className="bg-gray-800 border-gray-600 focus:ring-blue-500"
              />
            </motion.div>

            {/* Email */}
            <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
              <Label htmlFor="email" className="block text-lg">
                Email <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="faizanalam.sde@gmail.com"
                value={input.email}
                onChange={changeEventHandler}
                className="bg-gray-800 border-gray-600 focus:ring-blue-500"
              />
            </motion.div>

            {/* Phone Number */}
            <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6 }}>
              <Label htmlFor="phoneNumber" className="block text-lg">
                Phone Number <span className="text-red-400">*</span>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="+91 8080808080"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="bg-gray-800 border-gray-600 focus:ring-blue-500"
              />
            </motion.div>

            {/* Password */}
            <motion.div className="mb-4" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
              <Label htmlFor="password" className="block text-lg">
                Password <span className="text-red-400">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="********"
                value={input.password}
                onChange={changeEventHandler}
                className="bg-gray-800 border-gray-600 focus:ring-blue-500"
              />
            </motion.div>

            {/* Profile Picture */}
            <motion.div className="mb-6" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.8 }}>
              <Label htmlFor="profilePicture" className="block text-lg">
                Profile Picture
              </Label>
              <Input
                id="profilePicture"
                type="file"
                accept="image/*"
                onChange={profilePictureHandler}
                className="bg-gray-800 border-gray-600"
              />
            </motion.div>

            {/* Role */}
            <motion.div className="mb-6" initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9 }}>
              <Label className="block mb-2 text-lg">
                I am a: <span className="text-red-400">*</span>
              </Label>
              <RadioGroup className="flex gap-4" value={input.role} onValueChange={(value) => setInput({ ...input, role: value })}>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="student" className="cursor-pointer">
                    JobSeeker
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    id="recruiter"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="recruiter" className="cursor-pointer">
                    Recruiter
                  </Label>
                </div>
              </RadioGroup>
            </motion.div>

            {/* Submit Button */}
            {loading ? (
              <Button className="w-full my-2 bg-blue-600 text-white">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button type="submit" className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all">
                Sign Up
              </Button>
            )}

            <p className="mt-4 text-center">
              Already have an account?
              <Link to="/login" className="text-blue-500 mx-1">
                Sign In
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Signup;
