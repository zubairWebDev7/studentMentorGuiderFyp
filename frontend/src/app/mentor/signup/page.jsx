"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Mail, Lock, User, Briefcase, Clock, BarChart2, Github, Linkedin } from "lucide-react";

function Page() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profession: "",
    experience: "",
    skillLevel: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseData(null);

    try {
      const response = await axios.post(`${baseURL}/user/mentor/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Response:", response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error("❌ Error:", error.response ? error.response.data : error.message);
      setResponseData(error.response?.data || { message: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = responseData && !responseData?.error && responseData?.message !== "Request failed";

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-lg"
      >
        {/* Header */}
        <div className="text-center mb-8 flex flex-col items-center gap-3">
          <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md w-fit">
            <Users size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
            Mentor Sign Up
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-400 rounded-full"
          />
          <p className="text-gradient-white text-sm mt-1">
            Share your expertise and start mentoring students today.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">

            <IconInput
              icon={<User size={16} />}
              label="Full Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
            />

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

            <IconInput
              icon={<Briefcase size={16} />}
              label="Profession"
              name="profession"
              placeholder="e.g. Senior Software Engineer"
              value={formData.profession}
              onChange={handleChange}
            />

            <IconInput
              icon={<Clock size={16} />}
              label="Experience (Years)"
              type="number"
              name="experience"
              placeholder="e.g. 5"
              value={formData.experience}
              onChange={handleChange}
            />

            {/* Skill Level select */}
            <label className="block">
              <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                <span className="text-blue-400"><BarChart2 size={16} /></span>
                Skill Level
              </span>
              <select
                name="skillLevel"
                value={formData.skillLevel}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm appearance-none"
              >
                <option value="" className="bg-[#0c0c0c]">Select Skill Level</option>
                <option value="beginner" className="bg-[#0c0c0c]">Beginner</option>
                <option value="intermediate" className="bg-[#0c0c0c]">Intermediate</option>
                <option value="advanced" className="bg-[#0c0c0c]">Advanced</option>
                <option value="expert" className="bg-[#0c0c0c]">Expert</option>
              </select>
            </label>

            <IconInput
              icon={<Github size={16} />}
              label="GitHub URL"
              type="url"
              name="githubUrl"
              placeholder="https://github.com/username"
              value={formData.githubUrl}
              onChange={handleChange}
              required={false}
            />

            <IconInput
              icon={<Linkedin size={16} />}
              label="LinkedIn URL"
              type="url"
              name="linkedinUrl"
              placeholder="https://linkedin.com/in/username"
              value={formData.linkedinUrl}
              onChange={handleChange}
              required={false}
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold text-white text-base disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader /> : "Create Mentor Account"}
            </motion.button>
          </form>

          {/* Response message */}
          {responseData && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 p-3 text-center rounded-xl text-sm font-medium ${
                isSuccess
                  ? "bg-green-600/20 text-green-300 border border-green-500/40"
                  : "bg-red-600/20 text-red-300 border border-red-500/40"
              }`}
            >
              {responseData.message || JSON.stringify(responseData)}
            </motion.div>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-gray-500 text-xs">already have an account?</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* Login button */}
          <motion.button
            onClick={() => router.push("/mentor/login")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-2xl border border-gradient-blue hover:bg-blue-400/10 transition-all font-semibold text-gradient-white text-base"
          >
            Log In Instead
          </motion.button>
        </div>

        {/* Student link */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Looking to learn?{" "}
          <button
            onClick={() => router.push("/student/signup")}
            className="text-blue-400 hover:underline"
          >
            Register as Student
          </button>
        </p>
      </motion.div>
    </div>
  );
}

// ── Icon Input ──
const IconInput = ({ icon, label, type = "text", placeholder, required = true, ...props }) => (
  <label className="block">
    <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
      <span className="text-blue-400">{icon}</span>
      {label}
    </span>
    <input
      type={type}
      required={required}
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
    <span>Submitting...</span>
  </div>
);

export default Page;