"use client";
import React, { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Mail, Lock } from "lucide-react";

function Page() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const router = useRouter();
  const { login, loading, responseData, error } = useAuthStore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData, router);
    // Navigate to dashboard after successful login
    if (!error) {
      router.push("/mentor/dashboard");
    }
  };

  const isSuccess = responseData && !error;

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center gap-3">
          <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md w-fit">
            <Users size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
            Mentor Login
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-400 rounded-full"
          />
          <p className="text-gradient-white text-sm mt-1">
            Welcome back! Log in to access your mentor dashboard.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue shadow-2xl p-8">
          <form onSubmit={handleLogin} className="space-y-5">

            <IconInput
              icon={<Mail size={16} />}
              label="Email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />

            <IconInput
              icon={<Lock size={16} />}
              label="Password"
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />

            {/* Forgot password */}
            <div className="text-right -mt-2">
              <button
                type="button"
                onClick={() => router.push("/mentor/forgot-password")}
                className="text-blue-400 text-xs hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold text-white text-base disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader /> : "Log In"}
            </motion.button>
          </form>

          {/* Response message */}
          {(responseData || error) && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 p-3 text-center rounded-xl text-sm font-medium ${
                isSuccess
                  ? "bg-green-600/20 text-green-300 border border-green-500/40"
                  : "bg-red-600/20 text-red-300 border border-red-500/40"
              }`}
            >
              {isSuccess
                ? responseData?.message || "Login successful! Redirecting..."
                : error?.message || "Login failed. Please try again."}
            </motion.div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">don't have an account?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Sign up button */}
          <motion.button
            onClick={() => router.push("/mentor/signup")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-2xl border border-gradient-blue hover:bg-blue-400/10 transition-all font-semibold text-gradient-white text-base"
          >
            Create Mentor Account
          </motion.button>
        </div>

        {/* Student link */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Are you a student?{" "}
          <button
            onClick={() => router.push("/student/login")}
            className="text-blue-400 hover:underline"
          >
            Log in as Student
          </button>
        </p>
      </motion.div>
    </div>
  );
}

// ── Icon Input ──
const IconInput = ({ icon, label, type = "text", placeholder, ...props }) => (
  <label className="block">
    <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
      <span className="text-blue-400">{icon}</span>
      {label}
    </span>
    <input
      type={type}
      required
      placeholder={placeholder}
      {...props}
      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
    />
  </label>
);

// ── Loader ──
const Loader = () => (
  <div className="flex items-center justify-center gap-2">
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    <span>Logging in...</span>
  </div>
);

export default Page;