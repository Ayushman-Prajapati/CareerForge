import React, {
  useState,
  useEffect
} from 'react';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  Mail,
  Lock,
  LogIn,
  AlertCircle
} from 'lucide-react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import api from '../services/api';

import Input from '../components/Input';
import Button from '../components/Button';


const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] = useState('');


  useEffect(() => {

    if (localStorage.getItem('token')) {

      navigate('/jobs');
    }

  }, [navigate]);


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }

    if (serverError) {

      setServerError('');
    }
  };


  const validateForm = () => {

    const newErrors = {};

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) {

      newErrors.email =
        'Email address is required';

    } else if (
      !emailRegex.test(formData.email)
    ) {

      newErrors.email =
        'Please enter a valid email';
    }

    if (!formData.password) {

      newErrors.password =
        'Password is required';

    } else if (
      formData.password.length < 6
    ) {

      newErrors.password =
        'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setServerError('');

    try {

      const formBody = new URLSearchParams();

      formBody.append(
        'username',
        formData.email
      );

      formBody.append(
        'password',
        formData.password
      );

      const response = await api.post(
        '/auth/login',
        formBody,
        {
          headers: {
            'Content-Type':
              'application/x-www-form-urlencoded'
          }
        }
      );


      localStorage.setItem(
        'otp_email',
        formData.email
      );

      toast.success(
        response.data.message ||
        'OTP sent successfully',
        {
          icon: '📩'
        }
      );

      navigate('/verify-otp');

    } catch (error) {

      console.error(error);

      let errMsg =
        'Login failed. Please try again.';

      if (error.response) {

        if (
          error.response.data.detail
        ) {

          errMsg =
            typeof error.response.data.detail ===
            'string'
              ? error.response.data.detail
              : JSON.stringify(
                  error.response.data.detail
                );

        } else if (
          error.response.data.message
        ) {

          errMsg =
            error.response.data.message;
        }

      } else if (error.request) {

        errMsg =
          'No response from the server. Please check if backend is running.';
      }

      setServerError(errMsg);

      toast.error(errMsg);
    }

    finally {

      setLoading(false);
    }
  };


  return (

    <div className="
      flex-1
      flex items-center justify-center
      px-4 py-12
      relative overflow-hidden

      bg-white
      dark:bg-cyber-950
    ">

      {/* Background Glows */}
      <div className="
        absolute top-1/4 left-1/10
        w-72 h-72 rounded-full
        bg-cyber-indigo/10
        blur-[90px]
        pointer-events-none
        animate-pulse-slow
      "></div>

      <div className="
        absolute bottom-1/4 right-1/10
        w-80 h-80 rounded-full
        bg-cyber-cyan/10
        blur-[100px]
        pointer-events-none
        animate-pulse-slow
      "></div>


      <motion.div
        initial={{
          opacity: 0,
          y: 30
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          duration: 0.6
        }}
        className="
          w-full max-w-md
          relative z-10
        "
      >

        <div className="
          glass-card
          p-8
          rounded-3xl
          border
          border-slate-300/60
          dark:border-slate-800/80
          shadow-glass-lg
          backdrop-blur-glass
        ">

          {/* Header */}
          <div className="text-center mb-8">

            <div className="
              mx-auto mb-5
              w-16 h-16
              rounded-2xl
              bg-gradient-cyber
              flex items-center justify-center
              shadow-glow-indigo
            ">

              <LogIn
                className="text-white"
                size={28}
              />

            </div>

            <h2 className="
              text-3xl
              font-extrabold
              tracking-tight

              text-slate-900
              dark:text-white

              mb-2
            ">

              Welcome to

              <span className="
                text-gradient-indigo-cyan
              ">
                {' '}CareerForge
              </span>

            </h2>

            <p className="
              text-sm
              text-slate-600
              dark:text-slate-400
            ">

              Continue building your tech future.

            </p>

          </div>


          {/* Error */}
          {
            serverError && (

              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                className="
                  mb-6
                  p-4
                  rounded-2xl

                  bg-cyber-rose/10

                  border
                  border-cyber-rose/30

                  text-cyber-rose
                  text-sm

                  flex items-start gap-2.5
                "
              >

                <AlertCircle
                  className="
                    w-5 h-5
                    shrink-0 mt-0.5
                  "
                />

                <span>{serverError}</span>

              </motion.div>
            )
          }


          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />

            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="
                w-full
                py-3.5
                mt-2.5
              "
              loading={loading}
              icon={LogIn}
            >

              Send OTP

            </Button>

          </form>


          {/* Footer */}
          <div className="
            mt-8
            text-center
            text-sm

            text-slate-600
            dark:text-slate-400

            border-t
            border-slate-300/60
            dark:border-slate-800/50

            pt-6
          ">

            New to CareerForge?{' '}

            <Link
              to="/register"
              className="
                font-semibold
                text-cyber-cyan
                hover:text-cyber-indigo
                transition-colors duration-200
              "
            >

              Create an account

            </Link>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Login;