"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Brain,
  BookOpen,
  Calendar,
  Star,
  Shield,
  Zap,
  Globe,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

export default function LandingPage() {
  const registerRef = useRef<HTMLElement>(null);

  const scrollToRegister = () => {
    registerRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Users size={24} />,
      title: "Verified Mentors",
      description:
        "Connect with mentors validated via LinkedIn & GitHub for genuine, trustworthy guidance.",
    },
    {
      icon: <Brain size={24} />,
      title: "AI Matching System",
      description:
        "RAG-based intelligence suggests the right mentors and courses aligned to your career goals.",
    },
    {
      icon: <BookOpen size={24} />,
      title: "Course Discovery",
      description:
        "Browse mentor-led courses with clear outlines, practical outcomes, and flexible enrollment.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Progress Tracking",
      description:
        "Monitor enrollment status, completed sessions, and milestones across your learning journey.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Students" },
    { value: "500+", label: "Verified Mentors" },
    { value: "95%", label: "Success Rate" },
    { value: "50+", label: "Categories" },
  ];

  const testimonials = [
    {
      name: "Sarah K.",
      role: "Software Engineer",
      company: "Stripe",
      text: "AI matching connected me with the right mentor and made it easy to follow a clear learning path from day one.",
      rating: 5,
    },
    {
      name: "Ahmed R.",
      role: "Product Manager",
      company: "Notion",
      text: "The mentor profiles and course discovery features helped me find the exact guidance I needed to level up.",
      rating: 5,
    },
    {
      name: "Priya M.",
      role: "Data Scientist",
      company: "Airbnb",
      text: "Verified mentors kept my sessions focused and the progress dashboard helped me stay on track consistently.",
      rating: 5,
    },
  ];

  const extraFeatures = [
    {
      icon: <Shield size={22} />,
      title: "Verified Network",
      description: "Mentors validated for expertise and trusted by students worldwide.",
    },
    {
      icon: <Globe size={22} />,
      title: "Direct Chat",
      description: "Message mentors to discuss goals, course details, and next steps.",
    },
    {
      icon: <Zap size={22} />,
      title: "Progress Dashboard",
      description: "Track enrolled courses, completed sessions, and learning milestones.",
    },
    {
      icon: <Star size={22} />,
      title: "Flexible Enrollment",
      description: "Pick mentors and courses that match your schedule and career goals.",
    },
  ];

  const steps = [
    {
      title: "Create your profile",
      desc: "Sign up as a student and complete your learning profile with goals and interests.",
    },
    {
      title: "Explore mentors & courses",
      desc: "Browse verified mentors and discover mentor-led courses tailored to your field.",
    },
    {
      title: "Connect & plan",
      desc: "Message mentors directly to plan sessions, learning paths, and next milestones.",
    },
    {
      title: "Get AI recommendations",
      desc: "Our RAG-based matching suggests mentors aligned to your specific career needs.",
    },
    {
      title: "Track your progress",
      desc: "Monitor enrolled courses, completed sessions, and celebrate your milestones.",
    },
  ];

  return (
    <div className="min-h-screen w-full relative text-white">
      <main className="max-w-6xl mx-auto px-6 py-20 md:py-28 flex flex-col gap-28 md:gap-36">

        {/* ── Hero ── */}
        <section className="relative">
          <div className="flex flex-col items-center text-center gap-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/5 backdrop-blur-sm"
            >
              <Sparkles size={14} className="text-blue-400" />
              <span className="text-xs tracking-[0.2em] uppercase text-blue-300 font-medium">
                AI-Powered Mentorship
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] max-w-4xl"
            >
              Learn from mentors who{" "}
              <span className="italic font-light text-blue-400">actually</span>{" "}
              know your field.
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl text-base md:text-lg text-gray-300 leading-relaxed"
            >
              Connect with verified mentors, discover mentor-led courses, and track your progress —
              all powered by intelligent AI matching built to accelerate your career.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center gap-4 mt-4"
            >
              <motion.button
                onClick={scrollToRegister}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors font-semibold text-white shadow-[0_0_40px_rgba(59,130,246,0.3)]"
              >
                Get Started
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <button className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all font-medium text-gray-200">
                Browse Mentors
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="flex items-center gap-2 text-xs text-gray-400 mt-2"
            >
              <CheckCircle2 size={14} className="text-blue-400" />
              <span>Free to start · No credit card required</span>
            </motion.div>
          </div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 border-y border-white/10 divide-x divide-white/10"
          >
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="py-8 px-4 text-center hover:bg-white/[0.02] transition-colors"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── Key Features ── */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="text-xs tracking-[0.25em] uppercase text-blue-400 font-medium mb-4">
                — 01 / Features
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                Everything you need to grow,{" "}
                <span className="text-gray-400">in one platform.</span>
              </h2>
            </div>
            <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
              Thoughtfully built tools that connect students with the right mentors and keep
              learning on track.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10 rounded-2xl overflow-hidden">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-8 md:p-10 bg-[#0a0a0a] hover:bg-[#0f0f0f] transition-colors"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400">
                    {feature.icon}
                  </div>
                  <span className="text-xs font-mono text-gray-500">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Why Choose Us ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs tracking-[0.25em] uppercase text-blue-400 font-medium mb-4">
              — 02 / Why Us
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Built for serious learners{" "}
              <span className="text-gray-400">and committed mentors.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {extraFeatures.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative p-6 rounded-2xl border border-white/10 hover:border-blue-400/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all"
              >
                <div className="text-blue-400 mb-5">{feat.icon}</div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feat.description}
                </p>
                <div className="absolute top-6 right-6 w-1.5 h-1.5 rounded-full bg-blue-400/40 group-hover:bg-blue-400 transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── How It Works ── */}
        <section>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <div className="text-xs tracking-[0.25em] uppercase text-blue-400 font-medium mb-4">
                — 03 / Process
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
                From sign-up to your first session{" "}
                <span className="text-gray-400">in minutes.</span>
              </h2>
            </div>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-3 bottom-3 w-px bg-gradient-to-b from-blue-400/60 via-white/20 to-transparent" />

            <div className="space-y-10">
              {steps.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-6 items-start group"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full border border-blue-400/40 bg-[#0a0a0a] flex items-center justify-center text-blue-400 font-mono text-sm group-hover:border-blue-400 group-hover:bg-blue-500/10 transition-all">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <div className="flex-1 pt-1.5 pb-1">
                    <h3 className="text-lg font-semibold text-white mb-1.5">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Testimonials ── */}
        <section>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs tracking-[0.25em] uppercase text-blue-400 font-medium mb-4">
              — 04 / Testimonials
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Loved by students{" "}
              <span className="text-gray-400">across the globe.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex flex-col p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-blue-400 fill-blue-400"
                    />
                  ))}
                </div>
                <p className="text-gray-200 leading-relaxed mb-6 flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 flex items-center justify-center text-white text-sm font-semibold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Register ── */}
        <section ref={registerRef} className="scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs tracking-[0.25em] uppercase text-blue-400 font-medium mb-4">
              — 05 / Get Started
            </div>
            <motion.h2
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-5"
            >
              Choose your path forward.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-gray-400 max-w-xl mx-auto"
            >
              Create an account as a Mentor or a Student to get started. Pick the option that best
              describes you.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Mentor Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-blue-400/40 transition-all overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-400/20 text-blue-400">
                    <Users size={24} />
                  </div>
                  <span className="text-xs font-mono text-gray-500 tracking-wider">
                    FOR MENTORS
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  I&apos;m a Mentor
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Share your expertise, create courses, and mentor students one-on-one.
                </p>

                <ul className="space-y-3 mb-10">
                  {[
                    "Build and sell your own courses",
                    "Set your own availability & rates",
                    "LinkedIn & GitHub verification badge",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2
                        size={16}
                        className="text-blue-400 flex-shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    (window.location.href = "http://localhost:3006/mentor/signup")
                  }
                  className="w-full group/btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-blue-500 hover:bg-blue-400 transition-colors font-semibold text-white"
                >
                  Register as Mentor
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>

            {/* Student Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative p-8 md:p-10 rounded-3xl border border-white/10 bg-white/[0.02] hover:border-white/30 transition-all overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all" />

              <div className="relative">
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-white">
                    <BookOpen size={24} />
                  </div>
                  <span className="text-xs font-mono text-gray-500 tracking-wider">
                    FOR STUDENTS
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  I&apos;m a Student
                </h3>
                <p className="text-gray-400 mb-8 leading-relaxed">
                  Find verified mentors, explore supportive courses, and manage your learning
                  progress.
                </p>

                <ul className="space-y-3 mb-10">
                  {[
                    "AI-matched mentor recommendations",
                    "Track progress across enrolled courses",
                    "Flexible mentor guidance across timezones",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2
                        size={16}
                        className="text-white flex-shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() =>
                    (window.location.href = "http://localhost:3006/student/signup")
                  }
                  className="w-full group/btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-gray-100 transition-colors font-semibold text-black"
                >
                  Register as Student
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
}