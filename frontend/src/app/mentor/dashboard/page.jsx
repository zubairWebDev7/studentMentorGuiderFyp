"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MentorNavbar from "../../components/MentorNavbar";
import axios from "axios";
import {
  Users,
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  Award,
  Target,
  Zap,
} from "lucide-react";

export default function MentorDashboard() {
  const [mentor, setMentor] = useState(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalSessions: 0,
    totalChats: 0,
    approvalStatus: "pending",
    experience: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        setLoading(true);
        const baseURL = process.env.NEXT_PUBLIC_API_URL;

        // Fetch mentor profile
        const profileRes = await axios.get(`${baseURL}/user/mentor/profile`, {
          withCredentials: true,
        });
        setMentor(profileRes.data.mentor);

        // Fetch student list for count
        const studentsRes = await axios.get(
          `${baseURL}/user/mentor/previouseChat/list`,
          {
            withCredentials: true,
          }
        );

        const students = studentsRes.data?.students || [];
        setStats((prev) => ({
          ...prev,
          totalStudents: students.length,
          totalChats: students.length,
          approvalStatus: profileRes.data.mentor.approved
            ? "approved"
            : "pending",
          experience: profileRes.data.mentor.experience || 0,
        }));
      } catch (err) {
        console.error("Error fetching mentor data:", err);
        setError("Failed to load mentor data");
      } finally {
        setLoading(false);
      }
    };

    fetchMentorData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
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
      <div className="min-h-screen w-full bg-black flex items-center justify-center">
        <div className="text-center p-8 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-red-500/30">
          <p className="text-red-400 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full relative ">
      <MentorNavbar />

      <main className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-12">
        {/* Welcome Section */}
        <motion.section
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gradient-white">
            Welcome back, {mentor?.name}
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 100 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-1 bg-blue-400 rounded-full"
          />
          <p className="text-gradient-white text-lg opacity-80">
            Manage your mentoring journey and track your impact
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
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {mentor?.name?.charAt(0).toUpperCase()}
              </div>
              <div
                className={`absolute -bottom-1 -right-1 px-3 py-1 rounded-full text-xs font-semibold ${
                  stats.approvalStatus === "approved"
                    ? "bg-green-500 text-white"
                    : "bg-yellow-500 text-black"
                }`}
              >
                {stats.approvalStatus === "approved" ? "✓ Verified" : "⏳ Pending"}
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-gradient-white">
                  {mentor?.name}
                </h2>
                <p className="text-blue-400 text-lg">{mentor?.profession}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Experience</p>
                  <p className="text-gradient-white font-bold text-lg">
                    {stats.experience}+ yrs
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Skill Level</p>
                  <p className="text-gradient-white font-bold text-lg">
                    {mentor?.skillLevel || "N/A"}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Rating</p>
                  <p className="text-gradient-white font-bold text-lg flex items-center gap-1">
                    4.8 <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <p className="text-gray-400 text-sm">Response Time</p>
                  <p className="text-gradient-white font-bold text-lg">2 hrs</p>
                </div>
              </div>

              {/* Bio */}
              {mentor?.bio && (
                <p className="text-gray-300 leading-relaxed">{mentor.bio}</p>
              )}

              {/* Specializations */}
              {mentor?.specialization && (
                <div className="flex flex-wrap gap-2">
                  {mentor.specialization.split(",").map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-800 to-blue-600 text-white text-sm font-medium"
                    >
                      {spec.trim()}
                    </span>
                  ))}
                </div>
              )}

              {/* Contact */}
              <p className="text-gray-400 text-sm">
                Email: <span className="text-blue-400">{mentor?.email}</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Users,
              title: "Active Students",
              value: stats.totalStudents,
              color: "from-blue-600 to-blue-400",
              bgColor: "bg-blue-500/10",
              borderColor: "border-blue-500/30",
            },
            {
              icon: MessageCircle,
              title: "Total Conversations",
              value: stats.totalChats,
              color: "from-purple-600 to-purple-400",
              bgColor: "bg-purple-500/10",
              borderColor: "border-purple-500/30",
            },
            {
              icon: TrendingUp,
              title: "Session Completion",
              value: "92%",
              color: "from-green-600 to-green-400",
              bgColor: "bg-green-500/10",
              borderColor: "border-green-500/30",
            },
            {
              icon: Award,
              title: "Students Mentored",
              value: stats.totalStudents * 3,
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
                icon: MessageCircle,
                title: "Message Students",
                description: "Send messages to your mentees",
                href: "/mentor/chat",
                color: "border-blue-500/30 bg-blue-500/10",
                iconBg: "from-blue-800 to-blue-400",
              },
              {
                icon: Users,
                title: "View All Students",
                description: "See all your current mentees",
                href: "/mentor/allStudents",
                color: "border-purple-500/30 bg-purple-500/10",
                iconBg: "from-purple-800 to-purple-400",
              },
              {
                icon: Target,
                title: "Edit Profile",
                description: "Update your mentor information",
                href: "/mentor/profile",
                color: "border-green-500/30 bg-green-500/10",
                iconBg: "from-green-800 to-green-400",
              },
              {
                icon: Clock,
                title: "Upcoming Sessions",
                description: "Check your scheduled sessions",
                href: "/mentor/dashboard",
                color: "border-yellow-500/30 bg-yellow-500/10",
                iconBg: "from-yellow-800 to-yellow-400",
              },
              {
                icon: Zap,
                title: "Performance Analytics",
                description: "Track your metrics and insights",
                href: "/mentor/dashboard",
                color: "border-red-500/30 bg-red-500/10",
                iconBg: "from-red-800 to-red-400",
              },
              {
                icon: Award,
                title: "Certifications",
                description: "Manage your credentials",
                href: "/mentor/profile",
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
                action: "New student enrolled",
                name: "Aarav Singh",
                time: "2 hours ago",
                icon: "👤",
              },
              {
                action: "Session completed",
                name: "Web Development Mentoring",
                time: "4 hours ago",
                icon: "✓",
              },
              {
                action: "Profile updated",
                name: "Added new skills and experience",
                time: "1 day ago",
                icon: "📝",
              },
              {
                action: "Student feedback received",
                name: "Excellent mentor, very helpful!",
                time: "2 days ago",
                icon: "⭐",
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