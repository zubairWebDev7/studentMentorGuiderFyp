"use client";
import React, { useState } from "react";
import { useStudentAuth } from "../../store/studentAuth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { BookOpen, User, Mail, Lock, GraduationCap, Target, Sparkles, Languages } from "lucide-react";

export default function StudentSignupPage() {
  const { signupStudent, loading } = useStudentAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    educationLevel: "",
    careerGoals: "",
    interests: "",
    languagePreference: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formattedData = {
      ...formData,
      interests: formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    const response = await signupStudent(formattedData, router);

    if (response?.message) {
      setMessage(response.message);
    } else if (response?.error) {
      setMessage(response.error.message || "Something went wrong.");
    }
  };

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
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
            Student Sign Up
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-400 rounded-full"
          />
          <p className="text-gradient-white text-sm mt-1">
            Create your account and start your learning journey
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
              icon={<GraduationCap size={16} />}
              label="Education Level"
              name="educationLevel"
              placeholder="e.g. Bachelor's, Self-taught"
              value={formData.educationLevel}
              onChange={handleChange}
            />

            {/* Career Goals textarea */}
            <label className="block">
              <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                <Target size={15} className="text-blue-400" />
                Career Goals
              </span>
              <textarea
                name="careerGoals"
                value={formData.careerGoals}
                onChange={handleChange}
                required
                rows={3}
                placeholder="Describe what you want to achieve..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
              />
            </label>

            <IconInput
              icon={<Sparkles size={16} />}
              label="Interests (comma-separated)"
              name="interests"
              placeholder="e.g. React, Machine Learning, Design"
              value={formData.interests}
              onChange={handleChange}
            />

            <IconInput
              icon={<Languages size={16} />}
              label="Language Preference"
              name="languagePreference"
              placeholder="e.g. English, Arabic"
              value={formData.languagePreference}
              onChange={handleChange}
            />

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 mt-2 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold text-white text-base disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? <Loader /> : "Create Account"}
            </motion.button>
          </form>

          {/* Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-5 p-3 text-center rounded-xl text-sm font-medium ${
                message.includes("successfully")
                  ? "bg-green-600/20 text-green-300 border border-green-500/40"
                  : "bg-red-600/20 text-red-300 border border-red-500/40"
              }`}
            >
              {message}
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
            onClick={() => router.push("/student/login")}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3 rounded-2xl border border-gradient-blue hover:bg-blue-400/10 transition-all font-semibold text-gradient-white text-base"
          >
            Log In Instead
          </motion.button>
        </div>

        {/* Back to home */}
        <p className="text-center text-gray-500 text-xs mt-6">
          Want to teach instead?{" "}
          <button
            onClick={() => router.push("/mentor/signup")}
            className="text-blue-400 hover:underline"
          >
            Register as Mentor
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
    <span>Processing...</span>
  </div>
);