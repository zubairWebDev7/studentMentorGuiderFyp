"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Users, Brain, BookOpen, Calendar, Star, Shield, Zap, Globe } from "lucide-react";

export default function LandingPage() {
  const registerRef = useRef<HTMLElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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

  const stats = [
    { value: "10,000+", label: "Active Students" },
    { value: "500+", label: "Verified Mentors" },
    { value: "95%", label: "Success Rate" },
    { value: "50+", label: "Course Categories" },
  ];

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Software Engineer",
      text: "The AI matching found me a mentor who had the exact experience I needed. Within 3 months I landed my dream job.",
      rating: 5,
    },
    {
      name: "Ahmed R.",
      role: "Product Manager",
      text: "Structured courses combined with 1-on-1 sessions accelerated my learning like nothing else I've tried.",
      rating: 5,
    },
    {
      name: "Priya M.",
      role: "Data Scientist",
      text: "My mentor was verified and genuinely experienced. Every session was packed with actionable insights.",
      rating: 5,
    },
  ];

  const extraFeatures = [
    {
      icon: <Shield size={24} />,
      title: "Secure Payments",
      description: "End-to-end encrypted transactions with full refund protection.",
    },
    {
      icon: <Globe size={24} />,
      title: "Global Community",
      description: "Connect with mentors and peers from 80+ countries worldwide.",
    },
    {
      icon: <Zap size={24} />,
      title: "Instant Access",
      description: "Start learning immediately after enrollment — no waiting required.",
    },
    {
      icon: <Star size={24} />,
      title: "Rated Sessions",
      description: "Every session is reviewed so quality stays consistently high.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative">
      <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-24">

        {/* ── Hero ── */}
        <section className="text-center flex flex-col items-center gap-6 relative">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gradient-white"
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

          {/* Fixed: now scrolls to Register section */}
          <motion.button
            onClick={scrollToRegister}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 px-8 py-4 rounded-2xl border-gradient-blue hover:bg-blue-400/20 transition-all font-semibold text-gradient-white text-lg"
          >
            Get Started
          </motion.button>
        </section>

        {/* ── Stats ── */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col items-center gap-2 p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue text-center"
              >
                <span className="text-3xl font-extrabold text-blue-400">{stat.value}</span>
                <span className="text-gradient-white text-sm">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Key Features ── */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
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
                viewport={{ once: true }}
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

        {/* ── Why Choose Us ── */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-white drop-shadow-md"
          >
            Why Choose Us
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {extraFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="flex flex-col items-center gap-3 p-5 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all text-center"
              >
                <div className="p-3 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md">
                  {feat.icon}
                </div>
                <h3 className="text-base font-semibold text-gradient-white">{feat.title}</h3>
                <p className="text-gradient-white text-sm">{feat.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section>
          <motion.h2
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-white drop-shadow-md"
          >
            How It Works
          </motion.h2>

          <ol className="relative ml-4 space-y-8">
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
                viewport={{ once: true }}
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

        {/* ── Testimonials ── */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-white drop-shadow-md"
          >
            What Our Users Say
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="flex flex-col gap-4 p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all"
              >
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-blue-400 fill-blue-400" />
                  ))}
                </div>
                <p className="text-gradient-white text-sm leading-relaxed italic">"{t.text}"</p>
                <div className="mt-auto pt-2 border-t border-white/10">
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-blue-400 text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Register ── */}
        <section ref={registerRef} className="text-center mt-16 relative scroll-mt-20">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-lg"
          >
            Register — Choose Your Role
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Create an account as a Mentor or a Student to get started. Pick the
            option that best describes you.
          </motion.p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-8 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md">
                <Users size={40} />
              </div>
              <h3 className="text-2xl font-semibold text-white">I'm a Mentor</h3>
              <p className="text-gray-300 text-center max-w-md">
                Share your expertise, create courses, and mentor students one-on-one.
              </p>
              <ul className="text-gray-400 text-sm text-left space-y-1.5 w-full max-w-xs">
                <li>✓ Build and sell your own courses</li>
                <li>✓ Set your own availability & rates</li>
                <li>✓ LinkedIn & GitHub verification badge</li>
              </ul>
              <button
                onClick={() => (window.location.href = "http://localhost:3006/mentor/signup")}
                className="mt-4 px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 transition-all font-semibold text-white"
              >
                Register as Mentor
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md">
                <BookOpen size={40} />
              </div>
              <h3 className="text-2xl font-semibold text-white">I'm a Student</h3>
              <p className="text-gray-300 text-center max-w-md">
                Find verified mentors, enroll in structured courses, and book sessions.
              </p>
              <ul className="text-gray-400 text-sm text-left space-y-1.5 w-full max-w-xs">
                <li>✓ AI-matched mentor recommendations</li>
                <li>✓ Earn certificates on completion</li>
                <li>✓ Flexible scheduling across timezones</li>
              </ul>
              <button
                onClick={() => (window.location.href = "http://localhost:3006/student/signup")}
                className="mt-4 px-8 py-3 rounded-full bg-green-600 hover:bg-green-500 transition-all font-semibold text-white"
              >
                Register as Student
              </button>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}