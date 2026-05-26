import React, {
  useState,
  useEffect
} from 'react';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  User,
  Mail,
  Lock,
  UserPlus,
  AlertCircle
} from 'lucide-react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import api from '../services/api';

import Input from '../components/Input';

import Button from '../components/Button';


const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

    const {
      name,
      value
    } = e.target;

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

    if (!formData.username.trim()) {

      newErrors.username =
        'Username is required';

    } else if (
      formData.username.trim().length < 3
    ) {

      newErrors.username =
        'Username must be at least 3 characters long';
    }

    if (!formData.email) {

      newErrors.email =
        'Email address is required';

    } else if (
      !emailRegex.test(formData.email)
    ) {

      newErrors.email =
        'Please enter a valid email address';
    }

    if (!formData.password) {

      newErrors.password =
        'Password is required';

    } else if (
      formData.password.length < 6
    ) {

      newErrors.password =
        'Password must be at least 6 characters long';
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {

      newErrors.confirmPassword =
        'Passwords do not match';
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    setServerError('');

    try {

      await api.post(
        '/auth/register',
        {
          username:
            formData.username,

          email:
            formData.email,

          password:
            formData.password,
        }
      );

      toast.success(
        'Registration successful!',
        {
          icon: '🎉'
        }
      );

      navigate('/login');

    } catch (error) {

      console.error(
        'Registration error:',
        error
      );

      let errMsg =
        'Failed to register.';

      if (error.response) {

        const data =
          error.response.data;

        if (data.detail) {

          errMsg =
            typeof data.detail ===
            'string'
              ? data.detail
              : JSON.stringify(
                  data.detail
                );

        } else if (
          data.message
        ) {

          errMsg =
            data.message;
        }

      } else if (
        error.request
      ) {

        errMsg =
          'No response from server. Please check backend.';
      }

      setServerError(errMsg);

      toast.error(errMsg);

    } finally {

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

      {/* Background Glow */}
      <div className="
        absolute top-1/4 left-1/10
        w-72 h-72 rounded-full
        bg-cyber-cyan/10
        blur-[90px]
        pointer-events-none
        animate-pulse-slow
      "></div>

      <div className="
        absolute bottom-1/4 right-1/10
        w-80 h-80 rounded-full
        bg-cyber-indigo/10
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
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1]
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

              <UserPlus
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

              Join

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

              Build your future in tech today.

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
              id="username"
              name="username"
              type="text"
              label="Username"
              placeholder="coder_forge"
              icon={User}
              value={formData.username}
              onChange={handleChange}
              error={errors.username}
              autoComplete="username"
              required
            />

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
              autoComplete="email"
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
              autoComplete="new-password"
              required
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              placeholder="••••••••"
              icon={Lock}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              autoComplete="new-password"
              required
            />

            <Button
              type="submit"
              variant="primary"
              className="
                w-full
                py-3.5
                mt-2.5
                cursor-pointer
              "
              loading={loading}
              icon={UserPlus}
            >

              Create Account

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

            Already have an account?{' '}

            <Link
              to="/login"
              className="
                font-semibold
                text-cyber-cyan
                hover:text-cyber-indigo
                transition-colors duration-200
              "
            >

              Log in here

            </Link>

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default Register;