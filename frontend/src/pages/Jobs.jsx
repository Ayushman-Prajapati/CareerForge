import React, {
  useState,
  useEffect
} from 'react';

import {
  useNavigate,
  Link
} from 'react-router-dom';

import {
  Search,
  PlusCircle,
  LogOut,
  Briefcase,
  RefreshCw,
  FolderOpen,
  AlertCircle
} from 'lucide-react';

import { motion } from 'framer-motion';

import toast from 'react-hot-toast';

import api from '../services/api';

import JobCard from '../components/JobCard';

import Spinner from '../components/Spinner';

import Button from '../components/Button';


const Jobs = () => {

  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] =
    useState('');


  const fetchJobs = async () => {

    setLoading(true);

    setError('');

    try {

      const response = await api.get(
        '/jobs/all'
      );

      if (
        Array.isArray(response.data)
      ) {

        setJobs(response.data);

      } else {

        console.error(
          'Unexpected response:',
          response.data
        );

        setJobs([]);
      }

    } catch (err) {

      console.error(
        'Error fetching jobs:',
        err
      );

      let errMsg =
        'Failed to load jobs.';

      if (err.response) {

        errMsg =
          err.response.data?.detail ||

          err.response.data?.message ||

          errMsg;

      } else if (err.request) {

        errMsg =
          'Could not reach backend.';
      }

      setError(errMsg);

      toast.error(errMsg);

    } finally {

      setLoading(false);
    }
  };


  useEffect(() => {

    fetchJobs();

  }, []);


  const handleLogout = () => {

    localStorage.removeItem('token');

    toast.success(
      'Logged out successfully',
      {
        icon: '🔒'
      }
    );

    navigate('/login');
  };


  const filteredJobs = jobs.filter(
    (job) => {

      const titleMatch =
        job.title
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      const companyMatch =
        job.company
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      const locationMatch =
        job.location
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          );

      return (
        titleMatch ||
        companyMatch ||
        locationMatch
      );
    }
  );


  return (

    <div className="
      flex-1
      max-w-7xl
      mx-auto
      w-full

      px-4 py-8 md:px-8

      relative

      bg-white
      dark:bg-cyber-950
    ">

      {/* Background Glow */}
      <div className="
        absolute top-1/3 left-1/2
        -translate-x-1/2

        w-[600px]
        h-[300px]

        rounded-full
        bg-cyber-indigo/5

        blur-[120px]

        pointer-events-none
        z-0
      "></div>


      <div className="
        relative z-10
        flex flex-col gap-8
      ">

        {/* Header */}
        <div className="
          flex flex-col gap-6
          md:flex-row
          md:items-center
          md:justify-between
        ">

          <div>

            <h1 className="
              text-4xl
              font-extrabold
              tracking-tight

              text-slate-900
              dark:text-white

              mb-3

              flex items-center gap-3
            ">

              <Briefcase
                className="
                  text-cyber-indigo
                  w-8 h-8
                "
              />

              Explore Opportunities

            </h1>

            <p className="
              text-sm

              text-slate-600
              dark:text-slate-400
            ">

              Discover premium developer roles
              tailored for your future.

            </p>

          </div>


          {/* Controls */}
          <div className="
            flex items-center gap-3
          ">

            <Link to="/create-job">

              <Button
                variant="primary"
                icon={PlusCircle}
                className="cursor-pointer"
              >

                Create Job

              </Button>

            </Link>

            <Button
              variant="secondary"
              onClick={handleLogout}
              icon={LogOut}
              className="
                text-cyber-rose/80
                border-cyber-rose/20
                hover:border-cyber-rose/40
                hover:bg-cyber-rose/5
                cursor-pointer
              "
            >

              Logout

            </Button>

          </div>

        </div>


        {/* Search */}
        <div className="
          glass-card
          rounded-3xl

          border
          border-slate-300/60
          dark:border-slate-800/80

          p-5

          flex flex-col
          sm:flex-row

          gap-4

          items-center
          justify-between

          shadow-glass
        ">

          <div className="
            relative
            w-full
            sm:max-w-md
          ">

            <div className="
              absolute inset-y-0 left-0
              pl-3.5

              flex items-center

              pointer-events-none

              text-slate-500
            ">

              <Search size={18} />

            </div>

            <input
              type="text"
              placeholder="Search jobs, companies, locations..."
              value={searchQuery}
              onChange={(e) =>
                setSearchQuery(e.target.value)
              }
              className="
                w-full

                pl-11 pr-4 py-3

                text-sm

                rounded-2xl

                glass-input

                text-slate-900
                dark:text-slate-100

                border
                border-slate-300/60
                dark:border-slate-700/50

                hover:border-slate-400
                dark:hover:border-slate-600/50

                focus:outline-none
                focus:border-cyber-indigo
                focus:ring-1
                focus:ring-cyber-indigo/30

                transition-all
              "
            />

          </div>


          <div className="
            flex items-center gap-3

            w-full sm:w-auto

            justify-end
          ">

            <span className="
              text-xs
              font-semibold

              px-3 py-2

              rounded-xl

              bg-slate-100
              dark:bg-slate-800/40

              text-slate-700
              dark:text-slate-400

              border
              border-slate-300/60
              dark:border-slate-700/30
            ">

              {filteredJobs.length}

              {' '}

              {
                filteredJobs.length === 1
                ? 'Job'
                : 'Jobs'
              }

              {' '}Found

            </span>

            <button
              onClick={fetchJobs}
              title="Refresh Listings"
              className="
                p-3

                rounded-2xl

                glass-card

                border
                border-slate-300/60
                dark:border-slate-700/50

                text-slate-600
                dark:text-slate-400

                hover:text-slate-900
                dark:hover:text-white

                transition-all

                cursor-pointer
              "
            >

              <RefreshCw
                size={17}
                className={
                  loading
                    ? 'animate-spin'
                    : ''
                }
              />

            </button>

          </div>

        </div>


        {/* Loading */}
        {
          loading ? (

            <div className="
              py-28

              flex flex-col
              items-center justify-center

              gap-5
            ">

              <Spinner size="lg" />

              <span className="
                text-sm
                tracking-wide

                text-slate-600
                dark:text-slate-400

                animate-pulse
              ">

                Syncing with CareerForge...

              </span>

            </div>

          ) : error ? (

            /* Error State */
            <div className="
              glass-card

              rounded-3xl

              border border-cyber-rose/20

              p-14

              text-center

              flex flex-col
              items-center

              max-w-lg
              mx-auto

              shadow-glass-lg
            ">

              <div className="
                w-16 h-16

                rounded-2xl

                bg-cyber-rose/10

                flex items-center justify-center

                border border-cyber-rose/30

                text-cyber-rose

                mb-5
              ">

                <AlertCircle size={32} />

              </div>

              <h3 className="
                text-2xl
                font-bold

                text-slate-900
                dark:text-white

                mb-3
              ">

                Failed to load jobs

              </h3>

              <p className="
                text-sm
                leading-relaxed

                text-slate-600
                dark:text-slate-400

                mb-7
              ">

                {error}

              </p>

              <Button
                variant="primary"
                icon={RefreshCw}
                onClick={fetchJobs}
              >

                Try Again

              </Button>

            </div>

          ) : filteredJobs.length === 0 ? (

            /* Empty State */
            <div className="
              glass-card

              rounded-3xl

              border
              border-slate-300/60
              dark:border-slate-800/80

              p-16

              text-center

              flex flex-col
              items-center

              max-w-xl
              mx-auto

              shadow-glass-lg
            ">

              <div className="
                w-20 h-20

                rounded-3xl

                bg-cyber-indigo/10

                flex items-center justify-center

                border border-cyber-indigo/20

                text-cyber-indigo

                mb-6
              ">

                <FolderOpen size={36} />

              </div>

              <h3 className="
                text-2xl
                font-bold

                text-slate-900
                dark:text-white

                mb-3
              ">

                No jobs available

              </h3>

              <p className="
                text-sm
                leading-relaxed

                text-slate-600
                dark:text-slate-400

                max-w-sm

                mb-8
              ">

                {
                  searchQuery

                  ? `No job matches "${searchQuery}".`

                  : 'Be the first to post an opportunity on CareerForge.'
                }

              </p>

              {
                !searchQuery ? (

                  <Link to="/create-job">

                    <Button
                      variant="primary"
                      icon={PlusCircle}
                    >

                      Post First Job

                    </Button>

                  </Link>

                ) : (

                  <Button
                    variant="secondary"
                    onClick={() =>
                      setSearchQuery('')
                    }
                  >

                    Clear Filters

                  </Button>
                )
              }

            </div>

          ) : (

            /* Jobs Grid */
            <motion.div
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              className="
                grid
                grid-cols-1
                md:grid-cols-2
                lg:grid-cols-3

                gap-6
              "
            >

              {
                filteredJobs.map(
                  (job, index) => (

                    <JobCard
                      key={
                        job.id ||
                        `${job.title}-${index}`
                      }
                      job={job}
                      index={index}
                    />
                  )
                )
              }

            </motion.div>

          )
        }

      </div>

    </div>
  );
};

export default Jobs;