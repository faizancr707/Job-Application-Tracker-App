import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!input.email || !input.password || !input.role) {
      return toast.error('All fields are required.');
    }

    try {
      dispatch(setLoading(true));
      axios.defaults.withCredentials = true;

      const res = await axios.post(
        `${USER_API_END_POINT}/login`,
        {
          ...input,
          role: input.role.trim().toLowerCase(), // ✅ Normalize role here
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate('/');
      }
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login failed';
      toast.error(msg);
      console.error('❌ Login Error:', msg);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate('/');
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
          className="w-full max-w-md p-8 bg-gray-900 border-gray-700 shadow-lg rounded-lg border"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          <motion.h1
            className="font-bold text-3xl mb-6 text-white text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Sign In
          </motion.h1>

          <form onSubmit={submitHandler}>
            {/* Email */}
            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Label htmlFor="email" className="block text-white text-lg">
                Email Address <span className="text-red-400">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@gmail.com"
                className="mt-1 p-3 border bg-transparent border-gray-500 rounded-md outline-none focus:border-blue-500 transition-all w-full text-white placeholder-gray-400"
                value={input.email}
                onChange={changeEventHandler}
              />
            </motion.div>

            {/* Password */}
            <motion.div
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Label htmlFor="password" className="block text-white text-lg">
                Password <span className="text-red-400">*</span>
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                className="mt-1 p-3 border bg-transparent border-gray-500 rounded-md outline-none focus:border-blue-500 transition-all w-full text-white placeholder-gray-400"
                value={input.password}
                onChange={changeEventHandler}
              />
            </motion.div>

            {/* Role Selection */}
            <motion.div
              className="mb-6"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Label className="block text-white mb-2 text-lg">
                I am a: <span className="text-red-400">*</span>
              </Label>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="student"
                    id="student"
                    className="cursor-pointer accent-blue-500"
                    checked={input.role === 'student'}
                    onChange={changeEventHandler}
                  />
                  <Label htmlFor="student" className="text-white cursor-pointer">
                    JobSeeker
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    id="recruiter"
                    className="cursor-pointer accent-blue-500"
                    checked={input.role === 'recruiter'}
                    onChange={changeEventHandler}
                  />
                  <Label htmlFor="recruiter" className="text-white cursor-pointer">
                    Recruiter
                  </Label>
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            {loading ? (
              <Button className="w-full my-2 bg-blue-600 text-white hover:bg-blue-700">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition-all"
              >
                Sign In
              </Button>
            )}

            {/* Link to Signup */}
            <p className="mt-4 text-center text-white">
              Don't have an account?
              <Link
                to="/signup"
                className="text-blue-400 hover:text-blue-300 mx-1 transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
