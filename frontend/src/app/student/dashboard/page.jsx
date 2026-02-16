"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import StudentNavbar from "../../components/StudentNavbar";
import axios from "axios";
import {
  Users,
  BookOpen,
  TrendingUp,
  Star,
  Clock,
  Target,
  Zap,
  Award,
} from "lucide-react";

export default function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [stats, setStats] = useState({
    enrolledCourses: 0,
    activeMentors: 0,
    completedSessions: 0,
    learningProgress: 68,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        // Fetch student profile
        const profileRes = await axios.get(`${baseURL}/user/student/profile`, {
          withCredentials: true,
        });

        setStudent(profileRes.data.student);

        // Set dummy stats for now (can be connected to actual API later)
        setStats((prev) => ({
          ...prev,
          enrolledCourses: 4,
          activeMentors: 3,
          completedSessions: 12,
          learningProgress: 68,
        }));
      } catch (err) {
        console.error("Error fetching student data:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full  flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gradient-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full  flex items-center justify-center">
        <div className="text-center p-8 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-red-500/30">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative ">
      <StudentNavbar />

      <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Welcome Section */}
        <motion.section
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-white">
            Welcome back, <span className="text-blue-400">{student?.name}</span>
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-blue-400 rounded-full"
          />
          <p className="text-gradient-white text-lg opacity-80">
            Continue your learning journey with world-class mentors
          </p>
        </motion.section>

        {/* Profile Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue p-8 hover:shadow-2xl hover:shadow-blue-500/20 transition-all"
        >
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Profile Avatar */}
            <div className="relative">
              <img
                src={
                  student?.profilePicture?.url ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={student?.name}
                className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg object-cover"
              />
              <div className="absolute -bottom-1 -right-1 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                ✓ Active Learner
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gradient-white">
                  {student?.name}
                </h2>
                <p className="text-blue-400 text-lg">
                  {student?.careerGoal || "Career Growth Seeker"}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Enrolled Courses</p>
                  <p className="text-gradient-white font-bold text-lg">
                    {stats.enrolledCourses}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Active Mentors</p>
                  <p className="text-gradient-white font-bold text-lg">
                    {stats.activeMentors}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Sessions Done</p>
                  <p className="text-gradient-white font-bold text-lg">
                    {stats.completedSessions}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Learning Progress</p>
                  <p className="text-gradient-white font-bold text-lg">
                    {stats.learningProgress}%
                  </p>
                </div>
              </div>

              {/* Bio */}
              {student?.bio && (
                <p className="text-gray-300 leading-relaxed">{student.bio}</p>
              )}

              {/* Interests */}
              {student?.interests && (
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(student.interests)
                    ? student.interests
                    : typeof student.interests === "string"
                    ? student.interests.split(",")
                    : []
                  ).map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-sm font-medium"
                    >
                      {typeof interest === "string" ? interest.trim() : interest}
                    </span>
                  ))}
                </div>
              )}

              {/* Contact */}
              <p className="text-gray-400 text-sm">
                Email: <span className="text-blue-400">{student?.email}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: BookOpen,
              title: "Enrolled Courses",
              value: stats.enrolledCourses,
              color: "from-blue-600 to-blue-400",
              bgColor: "bg-blue-500/10",
              borderColor: "border-blue-500/30",
            },
            {
              icon: Users,
              title: "Active Mentors",
              value: stats.activeMentors,
              color: "from-purple-600 to-purple-400",
              bgColor: "bg-purple-500/10",
              borderColor: "border-purple-500/30",
            },
            {
              icon: TrendingUp,
              title: "Sessions Completed",
              value: stats.completedSessions,
              color: "from-green-600 to-green-400",
              bgColor: "bg-green-500/10",
              borderColor: "border-green-500/30",
            },
            {
              icon: Target,
              title: "Learning Progress",
              value: `${stats.learningProgress}%`,
              color: "from-yellow-600 to-yellow-400",
              bgColor: "bg-yellow-500/10",
              borderColor: "border-yellow-500/30",
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
              whileHover={{ scale: 1.05, rotate: 1 }}
              className={`p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border ${stat.borderColor} hover:shadow-2xl transition-all`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-full bg-gradient-to-tr ${stat.color} shadow-lg`}
                >
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
              <p className="text-gradient-white text-3xl font-bold">{stat.value}</p>
            </motion.div>
          ))}
        </section>

        {/* Quick Actions */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-8 text-gradient-white"
          >
            Quick Actions
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: "Find Mentors",
                description: "Browse and connect with verified mentors",
                href: "/student/mentors",
                color: "border-blue-500/30 bg-blue-500/10",
                iconBg: "from-blue-800 to-blue-400",
              },
              {
                icon: BookOpen,
                title: "Browse Courses",
                description: "Explore courses and learning paths",
                href: "/student/ai-suggestion",
                color: "border-purple-500/30 bg-purple-500/10",
                iconBg: "from-purple-800 to-purple-400",
              },
              {
                icon: Clock,
                title: "Chat with Mentors",
                description: "Send messages to your mentors",
                href: "/student/chats",
                color: "border-green-500/30 bg-green-500/10",
                iconBg: "from-green-800 to-green-400",
              },
              {
                icon: Target,
                title: "View Profile",
                description: "Update your student information",
                href: "/student/profile",
                color: "border-yellow-500/30 bg-yellow-500/10",
                iconBg: "from-yellow-800 to-yellow-400",
              },
              {
                icon: Zap,
                title: "Get AI Suggestions",
                description: "Get personalized mentor recommendations",
                href: "/student/ai-suggestion",
                color: "border-red-500/30 bg-red-500/10",
                iconBg: "from-red-800 to-red-400",
              },
              {
                icon: Award,
                title: "View Certificates",
                description: "See your achievements and certificates",
                href: "/student/profile",
                color: "border-cyan-500/30 bg-cyan-500/10",
                iconBg: "from-cyan-800 to-cyan-400",
              },
            ].map((action, idx) => (
              <motion.a
                key={idx}
                href={action.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border ${action.color} hover:shadow-2xl transition-all cursor-pointer group`}
              >
                <div
                  className={`p-3 rounded-full bg-gradient-to-tr ${action.iconBg} w-fit mb-4 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <action.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gradient-white mb-2">
                  {action.title}
                </h3>
                <p className="text-gray-400">{action.description}</p>
              </motion.a>
            ))}
          </div>
        </section>

        {/* Learning Progress Section */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-8 text-gradient-white"
          >
            Your Learning Progress
          </motion.h2>

          <div className="space-y-4">
            {[
              { course: "Web Development Mastery", progress: 85, color: "blue" },
              { course: "Advanced JavaScript", progress: 72, color: "purple" },
              { course: "React & Next.js", progress: 60, color: "green" },
              { course: "Full Stack Development", progress: 45, color: "yellow" },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-xl hover:shadow-blue-500/10 transition-all"
              >
                <div className="flex justify-between mb-3">
                  <p className="font-semibold text-gradient-white text-lg">
                    {item.course}
                  </p>
                  <p className="text-blue-400 font-bold text-lg">{item.progress}%</p>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    transition={{ duration: 1, delay: idx * 0.2 }}
                    className={`h-full bg-gradient-to-r ${
                      item.color === "blue"
                        ? "from-blue-600 to-blue-400"
                        : item.color === "purple"
                        ? "from-purple-600 to-purple-400"
                        : item.color === "green"
                        ? "from-green-600 to-green-400"
                        : "from-yellow-600 to-yellow-400"
                    }`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-8 text-gradient-white"
          >
            Recent Activity
          </motion.h2>

          <div className="space-y-4">
            {[
              {
                action: "Completed module",
                name: "JavaScript Fundamentals",
                time: "2 hours ago",
                icon: "✓",
              },
              {
                action: "Mentor session scheduled",
                name: "With John Doe - Web Development",
                time: "5 hours ago",
                icon: "📅",
              },
              {
                action: "Certificate earned",
                name: "HTML & CSS Basics",
                time: "1 day ago",
                icon: "🏆",
              },
              {
                action: "Message from mentor",
                name: "Great progress on your projects!",
                time: "2 days ago",
                icon: "💬",
              },
            ].map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-xl hover:shadow-blue-500/10 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gradient-white font-semibold">
                      {activity.action}
                    </p>
                    <p className="text-gray-400">{activity.name}</p>
                  </div>
                  <p className="text-blue-400 text-sm">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}