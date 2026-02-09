"use client";
import React from "react";
import { motion } from "framer-motion";
import StudentNavbar from "../../components/StudentNavbar";
import { Users, Brain, BookOpen, Calendar } from "lucide-react";

export default function LandingPage() {
  const features = [
    {
      icon: <Users size={28} />,
      title: "Verified Mentors",
      description:
        "Connect with mentors validated via LinkedIn & GitHub for genuine guidance.",
    },
    {
      icon: <Brain size={28} />,
      title: "AI Matching System",
      description:
        "RAG-based AI matches you with the perfect mentor based on goals & skills.",
    },
    {
      icon: <BookOpen size={28} />,
      title: "Structured Courses",
      description:
        "Interactive courses with modules, videos, and certificates to track progress.",
    },
    {
      icon: <Calendar size={28} />,
      title: "Session Booking",
      description:
        "Easily schedule one-on-one mentor sessions with video conferencing integration.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24">
        {/* Hero Section */}
        <section className="text-center flex flex-col items-center gap-6 relative">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gradient-white  "
          >
            Mentor AI Platform
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-400 rounded-full mx-auto mt-2"
          />

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl text-gradient-white text-lg md:text-xl mt-4"
          >
            Connect with verified mentors, take courses, and book sessions with
            AI-powered personalized recommendations to accelerate your career.
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 rounded-2xl border-gradient-blue hover:bg-blue-400/20 transition-all font-semibold text-gradient-white text-lg"
          >
            Get Started
          </motion.button>
        </section>

        {/* Features Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-white drop-shadow-md"
          >
            Key Features
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-10">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="flex flex-col items-center gap-4 p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all"
              >
                <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gradient-white">{feature.title}</h3>
                <p className="text-gradient-white text-center">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section>
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-white drop-shadow-md"
          >
            How It Works
          </motion.h2>

          <ol className="relative  ml-4 space-y-8">
            {[
              "Sign up as a student and complete your learning profile.",
              "Browse verified mentors and explore their courses.",
              "Book sessions based on availability and timezone compatibility.",
              "Use our AI Matching system to get personalized mentor recommendations.",
              "Track your progress and earn certificates as you complete courses.",
            ].map((step, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="relative mb-6 pl-6 text-gray-200"
              >
                <span className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {idx + 1}
                </span>
                {step}
              </motion.li>
            ))}
          </ol>
        </section>

        {/* CTA Section */}
        <section className="text-center mt-16 relative">
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
          >
            Start Learning Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-200 mb-6"
          >
            Sign up and connect with mentors to accelerate your career growth
            with AI-guided learning.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(59, 130, 246, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 rounded-2xl  border-gradient-blue hover:bg-blue-400/20 transition-all font-semibold text-white text-lg"
          >
            Get Started
          </motion.button>
        </section>
      </main>
    </div>
  );
}
