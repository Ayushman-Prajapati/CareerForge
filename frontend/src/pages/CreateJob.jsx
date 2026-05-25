import React, {
  useState
} from 'react';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  Briefcase,
  Building2,
  MapPin,
  DollarSign,
  AlignLeft,
  ArrowLeft,
  Send,
  AlertCircle,
  Clock3,
  Layers3,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import api from '../services/api';

import Input from '../components/Input';

import Button from '../components/Button';


const CreateJob = () => {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({

      title: '',
      company: '',
      location: '',
      salary: '',
      description: '',

      experience: '',
      jobType: '',
      skills: '',
      eligibility: '',

      remote: false
    });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] =
    useState(false);

  const [serverError, setServerError] =
    useState('');


  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked
    } = e.target;

    setFormData((prev) => ({
      ...prev,

      [name]:
        type === 'checkbox'
          ? checked
          : value
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

    if (!formData.title.trim()) {

      newErrors.title =
        'Job title is required';
    }

    if (!formData.company.trim()) {

      newErrors.company =
        'Company name is required';
    }

    if (!formData.location.trim()) {

      newErrors.location =
        'Location is required';
    }

    if (!formData.salary.trim()) {

      newErrors.salary =
        'Salary range is required';
    }

    if (
      !formData.description.trim()
    ) {

      newErrors.description =
        'Description is required';

    } else if (
      formData.description.length < 20
    ) {

      newErrors.description =
        'Description should be at least 20 characters';
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
        '/jobs/create',
        {
          title: formData.title,
          company: formData.company,
          location: formData.location,
          salary: formData.salary,
          description:
            formData.description,

          experience:
            formData.experience,

          job_type:
            formData.jobType,

          skills:
            formData.skills,

          eligibility:
            formData.eligibility,

          remote:
            formData.remote
        }
      );

      toast.success(
        'Job opportunity posted!',
        {
          icon: '🚀'
        }
      );

      navigate('/jobs');

    } catch (error) {

      console.error(error);

      let errMsg =
        'Failed to create job.';

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
          'Backend server not reachable.';
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
      max-w-5xl
      mx-auto
      w-full

      px-4 py-8 md:px-8

      relative

      bg-white
      dark:bg-cyber-950
    ">

      {/* Background Glow */}
      <div className="
        absolute top-1/4 left-1/4

        w-96 h-96

        rounded-full

        bg-cyber-indigo/5

        blur-[120px]

        pointer-events-none
        z-0
      "></div>


      <div className="
        relative z-10
        flex flex-col gap-6
      ">

        {/* Breadcrumb */}
        <div>

          <Link
            to="/jobs"
            className="
              inline-flex
              items-center gap-2

              text-xs
              font-semibold
              uppercase
              tracking-wider

              text-slate-500
              dark:text-slate-400

              hover:text-slate-900
              dark:hover:text-white

              transition-colors
            "
          >

            <ArrowLeft
              size={14}
            />

            Back to jobs

          </Link>

        </div>


        {/* Header */}
        <div>

          <h1 className="
            text-4xl
            font-extrabold
            tracking-tight

            text-slate-900
            dark:text-white

            mb-3
          ">

            Create New

            <span className="
              text-gradient-indigo-cyan
            ">
              {' '}Opportunity
            </span>

          </h1>

          <p className="
            text-sm

            text-slate-600
            dark:text-slate-400
          ">

            Publish premium opportunities
            for developers worldwide.

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


        {/* Main Form */}
        <div className="
          glass-card

          rounded-3xl

          border
          border-slate-300/60
          dark:border-slate-800/80

          p-6 md:p-8

          shadow-glass-lg
        ">

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* BASIC INFO */}
            <div>

              <div className="
                flex items-center gap-2
                mb-5
              ">

                <Sparkles
                  className="
                    text-cyber-indigo
                  "
                  size={18}
                />

                <h2 className="
                  text-lg
                  font-bold

                  text-slate-900
                  dark:text-white
                ">

                  Basic Information

                </h2>

              </div>


              <div className="
                grid grid-cols-1
                md:grid-cols-2
                gap-5
              ">

                <Input
                  id="title"
                  name="title"
                  type="text"
                  label="Job Title"
                  placeholder="Senior Frontend Engineer"
                  icon={Briefcase}
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                  required
                />

                <Input
                  id="company"
                  name="company"
                  type="text"
                  label="Company"
                  placeholder="CareerForge Inc."
                  icon={Building2}
                  value={formData.company}
                  onChange={handleChange}
                  error={errors.company}
                  required
                />

                <Input
                  id="location"
                  name="location"
                  type="text"
                  label="Location"
                  placeholder="Remote / India"
                  icon={MapPin}
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                  required
                />

                <Input
                  id="salary"
                  name="salary"
                  type="text"
                  label="Salary Range"
                  placeholder="$80k - $120k"
                  icon={DollarSign}
                  value={formData.salary}
                  onChange={handleChange}
                  error={errors.salary}
                  required
                />

              </div>

            </div>


            {/* JOB META */}
            <div>

              <div className="
                flex items-center gap-2
                mb-5
              ">

                <Layers3
                  className="
                    text-cyber-cyan
                  "
                  size={18}
                />

                <h2 className="
                  text-lg
                  font-bold

                  text-slate-900
                  dark:text-white
                ">

                  Job Details

                </h2>

              </div>


              <div className="
                grid grid-cols-1
                md:grid-cols-2
                gap-5
              ">

                <div>

                  <label className="
                    text-xs
                    uppercase
                    tracking-wider
                    font-semibold

                    text-slate-500
                    dark:text-slate-400
                  ">

                    Experience Level

                  </label>

                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="
                      mt-2
                      w-full
                      py-3 px-4

                      rounded-2xl

                      glass-input

                      text-slate-900
                      dark:text-white

                      border
                      border-slate-300/60
                      dark:border-slate-700/50
                    "
                  >

                    <option value="">
                      Select experience
                    </option>

                    <option>
                      Fresher
                    </option>

                    <option>
                      Junior
                    </option>

                    <option>
                      Mid-Level
                    </option>

                    <option>
                      Senior
                    </option>

                  </select>

                </div>


                <div>

                  <label className="
                    text-xs
                    uppercase
                    tracking-wider
                    font-semibold

                    text-slate-500
                    dark:text-slate-400
                  ">

                    Job Type

                  </label>

                  <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    className="
                      mt-2
                      w-full
                      py-3 px-4

                      rounded-2xl

                      glass-input

                      text-slate-900
                      dark:text-white

                      border
                      border-slate-300/60
                      dark:border-slate-700/50
                    "
                  >

                    <option value="">
                      Select type
                    </option>

                    <option>
                      Full Time
                    </option>

                    <option>
                      Internship
                    </option>

                    <option>
                      Contract
                    </option>

                    <option>
                      Part Time
                    </option>

                  </select>

                </div>

              </div>

            </div>


            {/* SKILLS */}
            <div>

              <Input
                id="skills"
                name="skills"
                type="text"
                label="Skills Required"
                placeholder="React, FastAPI, PostgreSQL..."
                icon={CheckCircle2}
                value={formData.skills}
                onChange={handleChange}
              />

            </div>


            {/* ELIGIBILITY */}
            <div>

              <Input
                id="eligibility"
                name="eligibility"
                type="text"
                label="Eligibility Criteria"
                placeholder="B.Tech CSE, 7+ CGPA..."
                icon={Clock3}
                value={formData.eligibility}
                onChange={handleChange}
              />

            </div>


            {/* DESCRIPTION */}
            <div>

              <label className="
                text-xs
                uppercase
                tracking-wider
                font-semibold

                text-slate-500
                dark:text-slate-400
              ">

                Job Description

              </label>

              <div className="
                relative mt-2
              ">

                <AlignLeft
                  size={18}
                  className="
                    absolute left-4 top-4

                    text-slate-400
                  "
                />

                <textarea
                  name="description"
                  rows="7"
                  placeholder="Describe responsibilities, expectations, tech stack, team structure..."
                  value={formData.description}
                  onChange={handleChange}
                  className="
                    w-full

                    pl-11 pr-4 py-4

                    rounded-2xl

                    glass-input

                    text-sm

                    text-slate-900
                    dark:text-white

                    border
                    border-slate-300/60
                    dark:border-slate-700/50

                    focus:outline-none
                    focus:border-cyber-indigo
                    focus:ring-1
                    focus:ring-cyber-indigo/30
                  "
                />

              </div>

              {
                errors.description && (

                  <p className="
                    mt-2
                    text-xs

                    text-cyber-rose
                  ">

                    {errors.description}

                  </p>
                )
              }

            </div>


            {/* REMOTE */}
            <div className="
              flex items-center gap-3
            ">

              <input
                type="checkbox"
                name="remote"
                checked={formData.remote}
                onChange={handleChange}
                className="
                  w-5 h-5
                  accent-cyber-indigo
                "
              />

              <span className="
                text-sm

                text-slate-700
                dark:text-slate-300
              ">

                This is a remote opportunity

              </span>

            </div>


            {/* FOOTER */}
            <div className="
              pt-5

              border-t
              border-slate-300/60
              dark:border-slate-800/40

              flex flex-col
              sm:flex-row

              gap-3

              justify-end
            ">

              <Link
                to="/jobs"
                className="
                  w-full sm:w-auto
                "
              >

                <Button
                  variant="secondary"
                  className="
                    w-full sm:w-auto
                  "
                >

                  Cancel

                </Button>

              </Link>

              <Button
                type="submit"
                variant="primary"
                loading={loading}
                icon={Send}
                className="
                  w-full sm:w-auto
                "
              >

                Publish Job

              </Button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default CreateJob;