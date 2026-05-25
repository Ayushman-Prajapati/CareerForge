import React, { useState } from 'react';

import { motion } from 'framer-motion';

import { useNavigate } from 'react-router-dom';

import {
  MapPin,
  Building2,
  DollarSign,
  Briefcase,
  Clock3,
  Trash2,
  Pencil,
  Send,
  CheckCircle2,
  Eye
} from 'lucide-react';

import toast from 'react-hot-toast';

import api from '../services/api';


const JobCard = ({ job, index, onDelete }) => {

  const navigate = useNavigate();

  const [applied, setApplied] = useState(false);

  const [loading, setLoading] = useState(false);

  const {
    id,
    title,
    company,
    location,
    salary,
    description,
    experience_level,
    job_type,
    eligibility,
    skills_required
  } = job;


  const role = localStorage.getItem('role');


  // Animation
  const cardVariants = {

    hidden: {
      opacity: 0,
      y: 20
    },

    visible: (i) => ({

      opacity: 1,

      y: 0,

      transition: {

        delay: i * 0.05,

        duration: 0.5,

        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };


  // APPLY JOB
  const handleApply = async () => {

    if (applied) return;

    setLoading(true);

    try {

      await api.post(
        `/applications/apply/${id}`
      );

      setApplied(true);

      toast.success(
        'Applied successfully 🚀'
      );

    } catch (err) {

      console.error(err);

      toast.error(

        err.response?.data?.detail ||

        err.response?.data?.message ||

        'Failed to apply'
      );

    } finally {

      setLoading(false);
    }
  };


  // DELETE JOB
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      'Delete this job permanently?'
    );

    if (!confirmDelete) return;

    try {

      await api.delete(`/jobs/${id}`);

      toast.success(
        'Job deleted successfully'
      );

      if (onDelete) {

        onDelete(id);
      }

    } catch (err) {

      console.error(err);

      toast.error(
        'Failed to delete job'
      );
    }
  };


  return (

    <motion.div

      custom={index}

      initial="hidden"

      animate="visible"

      variants={cardVariants}

      className="
        glass-card
        glass-card-hover

        p-6

        rounded-3xl

        flex
        flex-col
        justify-between

        h-full

        relative
        overflow-hidden

        group

        border

        border-slate-200
        dark:border-slate-800/70

        bg-white/80
        dark:bg-slate-900/60

        backdrop-blur-xl

        shadow-glass
      "
    >

      {/* Hover Glow */}
      <div className="
        absolute
        inset-0

        opacity-0
        group-hover:opacity-100

        transition-opacity
        duration-500

        bg-gradient-to-br
        from-cyber-indigo/5
        via-transparent
        to-cyber-cyan/5

        pointer-events-none
      "></div>


      {/* TOP */}
      <div className="relative z-10">

        {/* TITLE */}
        <div className="
          flex
          items-start
          justify-between
          gap-3
          mb-5
        ">

          <div>

            <h3 className="
              text-xl
              font-bold

              text-slate-900
              dark:text-white

              group-hover:text-cyber-cyan

              transition-colors
              duration-300

              line-clamp-1
            ">
              {title}
            </h3>

            <div className="
              flex
              items-center
              gap-2

              mt-2

              text-sm

              text-slate-600
              dark:text-slate-400
            ">

              <Building2 size={15} />

              <span className="font-medium">
                {company}
              </span>

            </div>

          </div>


          {/* HOT BADGE */}
          <span className="
            flex
            items-center
            gap-1.5

            px-3
            py-1

            rounded-full

            text-xs
            font-semibold

            bg-cyber-indigo/10

            text-cyber-indigo

            border
            border-cyber-indigo/20

            whitespace-nowrap
          ">

            <Briefcase size={12} />

            Hot

          </span>

        </div>


        {/* LOCATION + SALARY */}
        <div className="
          flex
          flex-wrap
          gap-4

          text-sm

          mb-5
        ">

          <div className="
            flex
            items-center
            gap-1.5

            text-slate-600
            dark:text-slate-400
          ">

            <MapPin size={15} />

            <span>{location}</span>

          </div>


          <div className="
            flex
            items-center
            gap-1.5

            text-cyber-emerald

            font-semibold
          ">

            <DollarSign size={15} />

            <span>{salary}</span>

          </div>

        </div>


        {/* TAGS */}
        <div className="
          flex
          flex-wrap
          gap-2

          mb-5
        ">

          {experience_level && (

            <span className="
              px-3
              py-1

              rounded-full

              text-xs
              font-medium

              bg-slate-200
              dark:bg-slate-800

              text-slate-700
              dark:text-slate-300
            ">

              {experience_level}

            </span>
          )}


          {job_type && (

            <span className="
              px-3
              py-1

              rounded-full

              text-xs
              font-medium

              bg-cyan-500/10

              text-cyan-500

              border
              border-cyan-500/20
            ">

              {job_type}

            </span>
          )}

        </div>


        {/* DESCRIPTION */}
        <p className="
          text-sm
          leading-relaxed

          text-slate-600
          dark:text-slate-400

          line-clamp-3

          group-hover:text-slate-700
          dark:group-hover:text-slate-300

          transition-colors
        ">

          {description}

        </p>


        {/* ELIGIBILITY */}
        {eligibility && (

          <div className="mt-5">

            <h4 className="
              text-sm
              font-semibold

              text-slate-900
              dark:text-white

              mb-2
            ">

              Eligibility

            </h4>

            <p className="
              text-sm

              text-slate-600
              dark:text-slate-400

              line-clamp-2
            ">

              {eligibility}

            </p>

          </div>
        )}


        {/* SKILLS */}
        {skills_required && (

          <div className="mt-5">

            <h4 className="
              text-sm
              font-semibold

              text-slate-900
              dark:text-white

              mb-2
            ">

              Skills Required

            </h4>

            <div className="
              flex
              flex-wrap
              gap-2
            ">

              {skills_required
                .split(',')
                .map((skill, idx) => (

                  <span
                    key={idx}
                    className="
                      px-2.5
                      py-1

                      rounded-lg

                      text-xs

                      bg-slate-200
                      dark:bg-slate-800

                      text-slate-700
                      dark:text-slate-300
                    "
                  >

                    {skill.trim()}

                  </span>
              ))}

            </div>

          </div>
        )}

      </div>


      {/* FOOTER */}
      <div className="
        relative
        z-10

        mt-6
        pt-5

        border-t

        border-slate-200
        dark:border-slate-800

        flex
        items-center
        justify-between
      ">

        {/* TIME */}
        <div className="
          flex
          items-center
          gap-1.5

          text-xs

          text-slate-500
        ">

          <Clock3 size={13} />

          Posted recently

        </div>


        {/* ACTIONS */}
        <div className="
          flex
          items-center
          gap-2
        ">

          {/* VIEW DETAILS */}
          <button

            onClick={() =>
              navigate(`/jobs/${id}`)
            }

            className="
              flex
              items-center
              gap-1.5

              px-4
              py-2

              rounded-xl

              border

              border-slate-300
              dark:border-slate-700

              text-slate-700
              dark:text-slate-300

              hover:bg-slate-100
              dark:hover:bg-slate-800

              transition
            "
          >

            <Eye size={15} />

            Details

          </button>


          {/* USER APPLY */}
          {role !== 'admin' && (

            <button

              onClick={handleApply}

              disabled={loading || applied}

              className={`
                flex
                items-center
                gap-1.5

                px-4
                py-2

                rounded-xl

                text-sm
                font-semibold

                transition-all
                duration-300

                ${applied
                  ? `
                    bg-emerald-500/15
                    text-emerald-500
                    border
                    border-emerald-500/20
                  `
                  : `
                    bg-gradient-cyber
                    text-white
                    hover:scale-105
                    shadow-glow-indigo
                  `
                }
              `}
            >

              {applied ? (
                <>
                  <CheckCircle2 size={15} />
                  Applied
                </>
              ) : (
                <>
                  <Send size={15} />
                  {loading ? 'Applying...' : 'Apply'}
                </>
              )}

            </button>
          )}


          {/* ADMIN */}
          {role === 'admin' && (

            <>
              <button

                onClick={() =>
                  navigate(`/edit-job/${id}`)
                }

                className="
                  p-2.5

                  rounded-xl

                  border

                  border-slate-300
                  dark:border-slate-700

                  text-slate-600
                  dark:text-slate-300

                  hover:bg-slate-100
                  dark:hover:bg-slate-800

                  transition
                "
              >

                <Pencil size={16} />

              </button>


              <button

                onClick={handleDelete}

                className="
                  p-2.5

                  rounded-xl

                  border

                  border-rose-500/20

                  text-rose-500

                  hover:bg-rose-500/10

                  transition
                "
              >

                <Trash2 size={16} />

              </button>

            </>
          )}

        </div>

      </div>

    </motion.div>
  );
};

export default JobCard;