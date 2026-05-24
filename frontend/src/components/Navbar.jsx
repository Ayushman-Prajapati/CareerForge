import React, { useState } from 'react';

import {
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import {
  Briefcase,
  LogOut,
  Menu,
  X,
  PlusCircle,
  LogIn,
  UserPlus,
  FileText
} from 'lucide-react';

import toast from 'react-hot-toast';

import ThemeToggle from './ThemeToggle';


const Navbar = () => {

  const navigate = useNavigate();

  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem('token');

  const isAuthenticated = !!token;


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


  const isActive = (path) =>
    location.pathname === path;


  const linkClass = (path) => `
    relative px-4 py-2 text-sm font-medium
    transition-all duration-300
    rounded-xl select-none

    ${
      isActive(path)

      ? `
        text-white
        bg-slate-800/60
        border border-indigo-500/25
        shadow-[0_0_15px_rgba(99,102,241,0.15)]
      `

      : `
        text-slate-400
        hover:text-white
        hover:bg-slate-800/30
        border border-transparent
      `
    }
  `;


  return (

    <nav className="sticky top-0 z-50 w-full px-4 py-4 md:px-8">

      <div className="max-w-7xl mx-auto">

        <div className="
          glass-card
          rounded-2xl
          border border-slate-800/80
          px-6 py-4
          flex items-center justify-between
          shadow-glass
          relative
          backdrop-blur-glass
        ">

          {/* Logo */}
          <Link
            to={
              isAuthenticated
                ? '/jobs'
                : '/login'
            }
            className="
              flex items-center gap-2.5
              group
            "
          >

            <div className="
              w-10 h-10
              rounded-xl
              bg-gradient-to-r
              from-indigo-500
              to-cyan-500
              flex items-center justify-center
              shadow-glow-indigo
              group-hover:scale-105
              transition-transform duration-300
            ">

              <Briefcase className="text-white w-5 h-5" />

            </div>

            <span className="
              font-extrabold
              text-xl
              tracking-tight
              bg-gradient-to-r
              from-indigo-400
              to-cyan-400
              bg-clip-text
              text-transparent
            ">

              Career
              <span className="text-gradient-indigo-cya">
                Forge
              </span>

            </span>

          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">

            {
              isAuthenticated
              ? (
                <>

                  <Link
                    to="/jobs"
                    className={linkClass('/jobs')}
                  >
                    Find Jobs
                  </Link>

                  <Link
                    to="/create-job"
                    className={linkClass('/create-job')}
                  >

                    <span className="
                      flex items-center gap-1.5
                    ">

                      <PlusCircle size={15} />

                      Create Job

                    </span>

                  </Link>

                  <Link
                    to="/resume-builder"
                    className={linkClass('/resume-builder')}
                  >

                    <span className="
                      flex items-center gap-1.5
                    ">

                      <FileText size={15} />

                      Resume Builder

                    </span>

                  </Link>

                  <div className="
                    h-5 w-[1px]
                    bg-slate-800
                    mx-1
                  "></div>

                  <ThemeToggle />

                  <button
                    onClick={handleLogout}
                    className="
                      flex items-center gap-1.5
                      px-4 py-2
                      text-sm font-medium
                      text-cyber-rose
                      hover:text-white
                      hover:bg-cyber-rose/10
                      border border-cyber-rose/25
                      hover:border-cyber-rose/50
                      rounded-xl
                      transition-all duration-300
                      cursor-pointer
                    "
                  >

                    <LogOut size={15} />

                    Logout

                  </button>

                </>
              )

              : (
                <>

                  <ThemeToggle />

                  <Link
                    to="/login"
                    className={linkClass('/login')}
                  >

                    <span className="
                      flex items-center gap-1.5
                    ">

                      <LogIn size={15} />

                      Login

                    </span>

                  </Link>

                  <Link
                    to="/register"
                    className={linkClass('/register')}
                  >

                    <span className="
                      flex items-center gap-1.5
                    ">

                      <UserPlus size={15} />

                      Register

                    </span>

                  </Link>

                </>
              )
            }

          </div>


          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-3">

            <ThemeToggle />

            <button
              onClick={() =>
                setIsOpen(!isOpen)
              }
              className="
                text-slate-300
                hover:text-white
                p-2
                rounded-xl
                border border-slate-700/40
                glass-card
              "
            >

              {
                isOpen
                  ? <X size={20} />
                  : <Menu size={20} />
              }

            </button>

          </div>

        </div>


        {/* Mobile Navigation */}
        {
          isOpen && (

            <div className="
              md:hidden
              mt-3
              glass-card
              border border-slate-800/80
              rounded-2xl
              p-4
              flex flex-col gap-3
              shadow-glass-lg
            ">

              {
                isAuthenticated
                ? (
                  <>

                    <Link
                      to="/jobs"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className={linkClass('/jobs')}
                    >
                      Find Jobs
                    </Link>

                    <Link
                      to="/create-job"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className={linkClass('/create-job')}
                    >
                      Create Job
                    </Link>

                    <Link
                      to="/resume-builder"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className={linkClass('/resume-builder')}
                    >
                      Resume Builder
                    </Link>

                    <button
                      onClick={() => {

                        setIsOpen(false);

                        handleLogout();
                      }}
                      className="
                        w-full
                        py-2.5 px-4
                        rounded-xl
                        text-sm font-medium
                        text-cyber-rose
                        bg-cyber-rose/5
                        border border-cyber-rose/20
                        hover:bg-cyber-rose/10
                        transition-colors
                      "
                    >

                      Logout

                    </button>

                  </>
                )

                : (
                  <>

                    <Link
                      to="/login"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className={linkClass('/login')}
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      onClick={() =>
                        setIsOpen(false)
                      }
                      className={linkClass('/register')}
                    >
                      Register
                    </Link>

                  </>
                )
              }

            </div>
          )
        }

      </div>

    </nav>
  );
};

export default Navbar;