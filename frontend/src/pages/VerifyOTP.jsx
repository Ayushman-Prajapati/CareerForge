import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';


const VerifyOTP = () => {

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();

  const email = localStorage.getItem(
    "otp_email"
  );

  const verifyOTP = () => {

    const savedOTP = localStorage.getItem(
      "otp"
    );

    if (otp === savedOTP) {

      toast.success(
        "OTP verified successfully"
      );

      localStorage.setItem(
        "token",
        "careerforge-user-token"
      );

      navigate("/jobs");

    } else {

      toast.error(
        "Invalid OTP"
      );
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#050816] px-4">

      <div className="w-full max-w-md bg-[#0b1220] border border-slate-800 rounded-3xl p-8 shadow-2xl">

        <h1 className="text-5xl font-bold text-white text-center mb-4">
          Verify OTP
        </h1>

        <p className="text-slate-400 text-center mb-2">
          OTP sent to
        </p>

        <p className="text-cyan-400 text-center mb-8 break-all">
          {email}
        </p>

        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) =>
            setOtp(e.target.value)
          }
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl px-5 py-4 text-white text-lg outline-none mb-6"
        />

        <button
          onClick={verifyOTP}
          className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition"
        >
          Verify OTP
        </button>

      </div>

    </div>
  );
};

export default VerifyOTP;