import React, {
  useEffect,
  useState
} from 'react';

import {
  useParams,
  Link
} from 'react-router-dom';

import {
  Building2,
  MapPin,
  DollarSign,
  Briefcase,
  Clock3,
  ArrowLeft,
  CheckCircle2,
  Globe,
  Layers3,
  Sparkles,
  CalendarDays,
  AlertCircle
} from 'lucide-react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import api from '../services/api';

import Spinner from '../components/Spinner';

import Button from '../components/Button';


const JobDetails = () => {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState('');


  const fetchJob = async () => {

    setLoading(true);

    setError('');

    try {

      const response = await api.get(
        `/jobs/${id}`
      );

      setJob(response.data);

    } catch (err) {

      console.error(err);

      let errMsg =
        'Failed to load job details.';

      if (err.response) {

        errMsg =
          err.response.data?.detail ||

          err.response.data?.message ||

          errMsg;
      }

      setError(errMsg);

      toast.error(errMsg);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchJob();

  }, [id]);


  if (loading) {

    return (

      <div className="
        flex-1
        flex items-center justify-center
      ">

        <div className="
          flex flex-col
          items-center gap-4
        ">

          <Spinner size="lg" />

          <p className="
            text-sm

            text-slate-600
            dark:text-slate-400
          ">

            Loading opportunity...

          </p>

        </div>

      </div>
    );
  }


  if (error || !job) {

    return (

      <div className="
        flex-1
        flex items-center justify-center

        px-4
      ">

        <div className="
          glass-card

          rounded-3xl

          border border-cyber-rose/20

          p-10

          max-w-lg
          w-full

          text-center
        ">

          <div className="
            w-16 h-16

            rounded-2xl

            bg-cyber-rose/10

            border border-cyber-rose/20

            flex items-center justify-center

            mx-auto mb-5
          ">

            <AlertCircle
              className="
                text-cyber-rose
              "
              size={30}
            />

          </div>

          <h2 className="
            text-2xl
            font-bold

            text-slate-900
            dark:text-white

            mb-3
          ">

            Failed to Load Job

          </h2>

          <p className="
            text-sm

            text-slate-600
            dark:text-slate-400

            mb-6
          ">

            {
              error ||
              'Job not found.'
            }

          </p>

          <Link to="/jobs">

            <Button
              variant="primary"
            >

              Back to Jobs

            </Button>

          </Link>

        </div>

      </div>
    );
  }


  return (

    <div className="
      flex-1

      max-w-7xl
      mx-auto
      w-full

      px-4 py-8 md:px-8

      bg-white
      dark:bg-cyber-950

      relative
    ">

      {/* Background Glow */}
      <div className="
        absolute top-1/4 left-1/2
        -translate-x-1/2

        w-[600px]
        h-[300px]

        rounded-full

        bg-cyber-indigo/5

        blur-[120px]

        pointer-events-none
      "></div>


      <div className="
        relative z-10
      ">

        {/* BACK */}
        <Link
          to="/jobs"
          className="
            inline-flex
            items-center gap-2

            text-sm
            font-medium

            text-slate-600
            dark:text-slate-400

            hover:text-slate-900
            dark:hover:text-white

            mb-8

            transition-colors
          "
        >

          <ArrowLeft size={16} />

          Back to jobs

        </Link>


        {/* HERO */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="
            glass-card

            rounded-3xl

            border
            border-slate-300/60
            dark:border-slate-800/80

            p-8

            shadow-glass-lg

            mb-8
          "
        >

          <div className="
            flex flex-col
            lg:flex-row

            gap-8

            justify-between
          ">

            {/* LEFT */}
            <div className="
              flex-1
            ">

              <div className="
                flex items-center gap-3
                mb-5
              ">

                <div className="
                  w-16 h-16

                  rounded-2xl

                  bg-gradient-cyber

                  flex items-center justify-center
                ">

                  <Building2
                    className="
                      text-white
                    "
                    size={28}
                  />

                </div>

                <div>

                  <h1 className="
                    text-4xl
                    font-extrabold

                    text-slate-900
                    dark:text-white

                    mb-2
                  ">

                    {job.title}

                  </h1>

                  <p className="
                    text-lg

                    text-cyber-indigo

                    font-semibold
                  ">

                    {job.company}

                  </p>

                </div>

              </div>


              {/* META */}
              <div className="
                flex flex-wrap
                gap-4

                mb-6
              ">

                <MetaCard
                  icon={MapPin}
                  label={
                    job.location ||
                    'Remote'
                  }
                />

                <MetaCard
                  icon={DollarSign}
                  label={
                    job.salary ||
                    'Competitive'
                  }
                />

                <MetaCard
                  icon={Clock3}
                  label={
                    job.experience ||
                    'Not specified'
                  }
                />

                <MetaCard
                  icon={Layers3}
                  label={
                    job.job_type ||
                    'Full Time'
                  }
                />

              </div>


              {/* TAGS */}
              <div className="
                flex flex-wrap gap-3
              ">

                {
                  job.remote && (

                    <Tag
                      icon={Globe}
                      text="Remote"
                    />
                  )
                }

                <Tag
                  icon={Sparkles}
                  text="ATS Friendly"
                />

                <Tag
                  icon={CalendarDays}
                  text="Actively Hiring"
                />

              </div>

            </div>


            {/* RIGHT ACTION */}
            <div className="
              lg:w-[300px]
            ">

              <div className="
                glass-card

                rounded-3xl

                border
                border-slate-300/60
                dark:border-slate-700/60

                p-6
              ">

                <h3 className="
                  text-lg
                  font-bold

                  text-slate-900
                  dark:text-white

                  mb-3
                ">

                  Apply for this Role

                </h3>

                <p className="
                  text-sm

                  text-slate-600
                  dark:text-slate-400

                  mb-6
                ">

                  Submit your optimized resume
                  and showcase your skills.

                </p>

                <div className="
                  flex flex-col gap-3
                ">

                  <Button
                    variant="primary"
                    className="
                      w-full
                    "
                  >

                    Apply Now

                  </Button>

                  <Link
                    to="/resume-builder"
                  >

                    <Button
                      variant="secondary"
                      className="
                        w-full
                      "
                    >

                      Build Resume

                    </Button>

                  </Link>

                </div>

              </div>

            </div>

          </div>

        </motion.div>


        {/* MAIN GRID */}
        <div className="
          grid
          grid-cols-1
          lg:grid-cols-3

          gap-8
        ">

          {/* LEFT CONTENT */}
          <div className="
            lg:col-span-2

            space-y-8
          ">

            {/* DESCRIPTION */}
            <SectionCard
              title="Job Description"
            >

              <p className="
                whitespace-pre-line

                text-slate-700
                dark:text-slate-300

                leading-relaxed
              ">

                {
                  job.description ||
                  'No description provided.'
                }

              </p>

            </SectionCard>


            {/* SKILLS */}
            <SectionCard
              title="Required Skills"
            >

              <div className="
                flex flex-wrap gap-3
              ">

                {
                  job.skills
                    ? job.skills
                        .split(',')
                        .map(
                          (
                            skill,
                            index
                          ) => (

                            <span
                              key={index}
                              className="
                                px-4 py-2

                                rounded-2xl

                                bg-cyber-indigo/10

                                border
                                border-cyber-indigo/20

                                text-cyber-indigo

                                text-sm
                                font-medium
                              "
                            >

                              {
                                skill.trim()
                              }

                            </span>
                          )
                        )

                    : (
                      <p className="
                        text-sm

                        text-slate-600
                        dark:text-slate-400
                      ">

                        No skills specified.

                      </p>
                    )
                }

              </div>

            </SectionCard>

          </div>


          {/* SIDEBAR */}
          <div className="
            space-y-8
          ">

            {/* ELIGIBILITY */}
            <SectionCard
              title="Eligibility Criteria"
            >

              <p className="
                text-sm
                leading-relaxed

                text-slate-700
                dark:text-slate-300
              ">

                {
                  job.eligibility ||
                  'No eligibility criteria specified.'
                }

              </p>

            </SectionCard>


            {/* COMPANY */}
            <SectionCard
              title="Company Overview"
            >

              <div className="
                flex items-center gap-3
                mb-4
              ">

                <div className="
                  w-12 h-12

                  rounded-2xl

                  bg-gradient-cyber

                  flex items-center justify-center
                ">

                  <Building2
                    className="
                      text-white
                    "
                    size={20}
                  />

                </div>

                <div>

                  <h4 className="
                    font-bold

                    text-slate-900
                    dark:text-white
                  ">

                    {job.company}

                  </h4>

                  <p className="
                    text-sm

                    text-slate-600
                    dark:text-slate-400
                  ">

                    Technology Company

                  </p>

                </div>

              </div>

              <p className="
                text-sm
                leading-relaxed

                text-slate-700
                dark:text-slate-300
              ">

                Join a forward-thinking team
                building innovative technology
                products and developer-first
                experiences.

              </p>

            </SectionCard>

          </div>

        </div>

      </div>

    </div>
  );
};


/* META CARD */
const MetaCard = ({
  icon: Icon,
  label
}) => (

  <div className="
    flex items-center gap-2

    px-4 py-2

    rounded-2xl

    bg-slate-100
    dark:bg-slate-900/70

    border
    border-slate-300/60
    dark:border-slate-700/50
  ">

    <Icon
      size={16}
      className="
        text-cyber-indigo
      "
    />

    <span className="
      text-sm
      font-medium

      text-slate-700
      dark:text-slate-300
    ">

      {label}

    </span>

  </div>
);


/* TAG */
const Tag = ({
  icon: Icon,
  text
}) => (

  <div className="
    flex items-center gap-2

    px-4 py-2

    rounded-2xl

    bg-cyber-indigo/10

    border
    border-cyber-indigo/20

    text-cyber-indigo

    text-sm
    font-medium
  ">

    <Icon size={14} />

    {text}

  </div>
);


/* SECTION CARD */
const SectionCard = ({
  title,
  children
}) => (

  <div className="
    glass-card

    rounded-3xl

    border
    border-slate-300/60
    dark:border-slate-800/80

    p-6

    shadow-glass
  ">

    <h2 className="
      text-xl
      font-bold

      text-slate-900
      dark:text-white

      mb-5
    ">

      {title}

    </h2>

    {children}

  </div>
);


export default JobDetails;