import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

const VerifyOTP = () => {

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const email = localStorage.getItem(
    "otp_email"
  );

  const verifyOTP = async () => {

    if (!otp) {

      toast.error("Please enter OTP");

      return;
    }

    setLoading(true);

    try {

      const response = await api.post(
        `/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${otp}`
      );

      if (response.data.error) {

        toast.error(
          response.data.error
        );

        return;
      }

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      toast.success(
        "OTP verified successfully 🚀"
      );

      navigate("/jobs");

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "Invalid OTP"
      );

    } finally {

      setLoading(false);
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
          disabled={loading}
          className="w-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white py-4 rounded-2xl font-semibold text-lg hover:opacity-90 transition disabled:opacity-50"
        >
          {
            loading
              ? "Verifying..."
              : "Verify OTP"
          }
        </button>

      </div>

    </div>
  );
};

export default VerifyOTP;