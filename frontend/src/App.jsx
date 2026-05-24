import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { Toaster } from 'react-hot-toast';


// Components
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';


// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';

import Jobs from './pages/Jobs';
import CreateJob from './pages/CreateJob';
import JobDetails from './pages/JobDetails';
import ResumeBuilder from './pages/ResumeBuilder';


// Root Redirect
const RootRedirect = () => {

  const token =
    localStorage.getItem('token');

  return token

    ? (
      <Navigate
        to="/jobs"
        replace
      />
    )

    : (
      <Navigate
        to="/login"
        replace
      />
    );
};


const App = () => {

  return (

    <Router>

      {/* Toast Provider */}
      <Toaster

        position="top-right"

        toastOptions={{

          duration: 4000,

          style: {

            background:
              'rgba(15, 23, 42, 0.92)',

            color: '#f8fafc',

            borderRadius: '18px',

            border:
              '1px solid rgba(255,255,255,0.08)',

            backdropFilter: 'blur(16px)',

            fontSize: '14px',

            fontWeight: '500',

            padding: '14px 18px',

            boxShadow:
              '0 12px 40px rgba(0,0,0,0.45)',
          },

          success: {

            iconTheme: {

              primary: '#10b981',

              secondary: '#ffffff'
            }
          },

          error: {

            iconTheme: {

              primary: '#f43f5e',

              secondary: '#ffffff'
            }
          }
        }}
      />


      {/* APP WRAPPER */}
      <div className="
        flex flex-col
        min-h-screen

        bg-white
        dark:bg-cyber-950

        text-slate-900
        dark:text-white

        relative
        overflow-hidden
      ">

        {/* GRID OVERLAY */}
        <div className="
          absolute inset-0

          bg-[linear-gradient(to_right,#0f172a12_1px,transparent_1px),linear-gradient(to_bottom,#0f172a12_1px,transparent_1px)]

          dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]

          bg-[size:4rem_4rem]

          [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]

          pointer-events-none
          z-0
        "></div>


        {/* GLOW EFFECTS */}
        <div className="
          absolute top-[-10%] left-[-10%]

          w-[40%]
          h-[40%]

          rounded-full

          bg-cyber-indigo/10

          blur-[120px]

          pointer-events-none
          z-0
        "></div>

        <div className="
          absolute bottom-[-10%] right-[-10%]

          w-[40%]
          h-[40%]

          rounded-full

          bg-cyber-cyan/10

          blur-[120px]

          pointer-events-none
          z-0
        "></div>


        {/* NAVBAR */}
        <div className="
          relative z-20
        ">

          <Navbar />

        </div>


        {/* MAIN CONTENT */}
        <main className="
          flex-1
          flex flex-col

          relative z-10
        ">

          <Routes>

            {/* ROOT */}
            <Route
              path="/"
              element={
                <RootRedirect />
              }
            />


            {/* AUTH */}
            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/register"
              element={<Register />}
            />

            <Route
              path="/verify-otp"
              element={<VerifyOTP />}
            />


            {/* PROTECTED ROUTES */}
            <Route
              path="/jobs"
              element={
                <ProtectedRoute>
                  <Jobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute>
                  <JobDetails />
                </ProtectedRoute>
              }
            />

            <Route
              path="/create-job"
              element={
                <ProtectedRoute>
                  <CreateJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/resume-builder"
              element={
                <ProtectedRoute>
                  <ResumeBuilder />
                </ProtectedRoute>
              }
            />


            {/* FALLBACK */}
            <Route
              path="*"
              element={
                <Navigate
                  to="/"
                  replace
                />
              }
            />

          </Routes>

        </main>


        {/* FOOTER */}
        <footer className="
          relative z-10

          border-t
          border-slate-200
          dark:border-slate-800/70

          py-6 px-4

          text-center

          text-xs

          text-slate-500
          dark:text-slate-400

          backdrop-blur-xl
        ">

          <div className="
            max-w-7xl
            mx-auto

            flex flex-col
            md:flex-row

            items-center
            justify-between

            gap-4
          ">

            <p>

              © {new Date().getFullYear()}

              {' '}

              CareerForge.

              All rights reserved.

            </p>

            <div className="
              flex items-center gap-5
            ">

              <button className="
                hover:text-slate-900
                dark:hover:text-white

                transition-colors
              ">

                Privacy

              </button>

              <button className="
                hover:text-slate-900
                dark:hover:text-white

                transition-colors
              ">

                Terms

              </button>

              <button className="
                hover:text-slate-900
                dark:hover:text-white

                transition-colors
              ">

                Support

              </button>

            </div>

          </div>

        </footer>

      </div>

    </Router>
  );
};

export default App;