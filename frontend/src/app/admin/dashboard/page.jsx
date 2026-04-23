"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserCheck,
  Activity,
  Clock,
  CheckCircle,
  ArrowUpRight,
  AlertCircle,
  RefreshCw,
  Briefcase,
} from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMentors: 0,
    approvedMentors: 0,
    pendingMentors: 0,
    totalStudents: 0,
    totalCourses: 0,
    activeCourses: 0,
    pendingCourses: 0,
  });
  const [recentCourses, setRecentCourses] = useState([]);
  const [recentMentors, setRecentMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const [mentorsRes, coursesRes, studentsRes] = await Promise.allSettled([
        axios.get(`${API_BASE}/admin/mentors`, { withCredentials: true }),
        axios.get(`${API_BASE}/admin/courses`, { withCredentials: true }),
        axios.get(`${API_BASE}/admin/students`, { withCredentials: true }),
      ]);

      // Mentors
      if (mentorsRes.status === "fulfilled") {
        const mentors = mentorsRes.value.data.mentors || [];
        // Sort: pending first, then newest first within each group
        const sorted = [...mentors].sort((a, b) => {
          if (a.approved !== b.approved) return a.approved ? 1 : -1;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        setRecentMentors(sorted.slice(0, 5));
        setStats((prev) => ({
          ...prev,
          totalMentors: mentors.length,
          approvedMentors: mentors.filter((m) => m.approved).length,
          pendingMentors: mentors.filter((m) => !m.approved).length,
        }));
      }

      // Courses
      if (coursesRes.status === "fulfilled") {
        const courses = coursesRes.value.data.courses || [];
        const sortedCourses = [...courses].sort(
          (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
        setRecentCourses(sortedCourses.slice(0, 5));
        setStats((prev) => ({
          ...prev,
          totalCourses: courses.length,
          activeCourses: courses.filter((c) => c.status === "active").length,
          pendingCourses: courses.filter((c) => c.status !== "active").length,
        }));
      }

      // Students (only if endpoint exists)
      if (studentsRes.status === "fulfilled") {
        const students = studentsRes.value.data.students || [];
        setStats((prev) => ({ ...prev, totalStudents: students.length }));
      }
    } catch (err) {
      setError(err?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Quick approve/reject from dashboard
  const toggleMentorApproval = async (mentorId) => {
    try {
      await axios.put(
        `${API_BASE}/admin/mentors/${mentorId}`,
        {},
        { withCredentials: true }
      );
      setRecentMentors((prev) =>
        prev.map((m) =>
          m._id === mentorId ? { ...m, approved: !m.approved } : m
        )
      );
      setStats((prev) => {
        const target = recentMentors.find((m) => m._id === mentorId);
        if (!target) return prev;
        const wasApproved = target.approved;
        return {
          ...prev,
          approvedMentors: prev.approvedMentors + (wasApproved ? -1 : 1),
          pendingMentors: prev.pendingMentors + (wasApproved ? 1 : -1),
        };
      });
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update mentor");
    }
  };

  const statCards = [
    {
      label: "Total Mentors",
      value: stats.totalMentors,
      icon: Users,
      gradient: "from-blue-600 to-blue-400",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      href: "/admin/mentors-application",
    },
    {
      label: "Pending Approvals",
      value: stats.pendingMentors,
      icon: UserCheck,
      gradient: "from-amber-600 to-amber-400",
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-400",
      href: "/admin/mentors-application",
    },
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: GraduationCap,
      gradient: "from-purple-600 to-purple-400",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
    },
    {
      label: "Active Courses",
      value: stats.activeCourses,
      icon: BookOpen,
      gradient: "from-emerald-600 to-emerald-400",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-400",
      href: "/admin/courses",
    },
  ];

  return (
    <div className="min-h-screen w-full px-6 py-12">
      <AdminNavbar />
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-sm mb-2">
              <Activity size={14} />
              <span>Admin Overview</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
              Dashboard
            </h1>
            <p className="text-gray-400 mt-2">
              Welcome back — here's what's happening on the platform today.
            </p>
          </div>

          <motion.button
            onClick={fetchDashboard}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0c0c0c]/70 border border-gradient-blue text-white text-sm font-medium hover:bg-blue-500/10 transition-all disabled:opacity-60 w-fit"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            Refresh
          </motion.button>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-300 mb-8"
          >
            <AlertCircle size={18} />
            {error}
          </motion.div>
        )}

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {statCards.map((card, idx) => (
            <StatCard key={card.label} {...card} index={idx} loading={loading} />
          ))}
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Mentor Applications */}
          <Panel
            title="Recent Mentor Applications"
            icon={UserCheck}
            href="/admin/mentors-application"
            delay={0.3}
            count={stats.pendingMentors > 0 ? `${stats.pendingMentors} pending` : null}
          >
            {loading ? (
              <PanelSkeleton />
            ) : recentMentors.length === 0 ? (
              <EmptyState icon={UserCheck} message="No mentor applications yet" />
            ) : (
              <ul className="flex flex-col gap-3">
                {recentMentors.map((mentor, idx) => (
                  <MentorRow
                    key={mentor._id}
                    mentor={mentor}
                    index={idx}
                    onToggle={toggleMentorApproval}
                  />
                ))}
              </ul>
            )}
          </Panel>

          {/* Recent Courses */}
          <Panel
            title="Recent Courses"
            icon={BookOpen}
            href="/admin/courses"
            delay={0.4}
            count={stats.pendingCourses > 0 ? `${stats.pendingCourses} pending` : null}
          >
            {loading ? (
              <PanelSkeleton />
            ) : recentCourses.length === 0 ? (
              <EmptyState icon={BookOpen} message="No courses yet" />
            ) : (
              <ul className="divide-y divide-white/5">
                {recentCourses.map((course) => (
                  <li
                    key={course._id}
                    className="py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-white text-sm font-medium truncate">
                        {course.title}
                      </p>
                      <p className="text-gray-500 text-xs truncate">
                        by {course.mentor?.name || "Unknown mentor"}
                      </p>
                    </div>
                    <StatusPill
                      active={course.status === "active"}
                      activeLabel="Active"
                      pendingLabel="Pending"
                    />
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Sub-components ─────────── */

function StatCard({ label, value, icon: Icon, gradient, iconBg, iconColor, href, index, loading }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="relative overflow-hidden rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue p-5 group cursor-pointer h-full"
    >
      <div
        className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-tr ${gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
      />
      <div className="flex items-start justify-between mb-4 relative">
        <div className={`p-2.5 rounded-xl ${iconBg}`}>
          <Icon size={20} className={iconColor} />
        </div>
        {href && (
          <ArrowUpRight
            size={16}
            className="text-gray-600 group-hover:text-blue-400 transition-colors"
          />
        )}
      </div>
      <p className="text-gray-400 text-xs uppercase tracking-wider mb-1 relative">
        {label}
      </p>
      <div className="flex items-baseline gap-2 relative">
        {loading ? (
          <div className="h-9 w-16 bg-white/5 rounded animate-pulse" />
        ) : (
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        )}
      </div>
    </motion.div>
  );

  return href ? <Link href={href}>{content}</Link> : content;
}

function Panel({ title, icon: Icon, href, count, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue p-6"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-blue-500/10">
            <Icon size={16} className="text-blue-400" />
          </div>
          <h3 className="text-white font-semibold">{title}</h3>
          {count && (
            <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-[10px] font-semibold">
              {count}
            </span>
          )}
        </div>
        {href && (
          <Link
            href={href}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
          >
            View all <ArrowUpRight size={12} />
          </Link>
        )}
      </div>
      {children}
    </motion.div>
  );
}

/* ─── Mentor Row with quick approve/reject action ─── */
function MentorRow({ mentor, index, onToggle }) {
  const [pending, setPending] = useState(false);

  const handleClick = async () => {
    setPending(true);
    await onToggle(mentor._id);
    setPending(false);
  };

  return (
    <motion.li
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 transition-colors"
    >
      {/* Avatar */}
      {mentor.profilePicture?.url ? (
        <img
          src={mentor.profilePicture.url}
          alt={mentor.name}
          className="w-10 h-10 rounded-full object-cover border border-blue-500/30 shrink-0"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 flex items-center justify-center text-white font-bold text-sm shrink-0">
          {mentor.name?.charAt(0).toUpperCase() || "M"}
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">
          {mentor.name || "Unknown"}
        </p>
        <div className="flex items-center gap-1.5 text-gray-500 text-xs truncate">
          <Briefcase size={10} className="shrink-0" />
          <span className="truncate">
            {mentor.profession || "—"}
            {mentor.experience ? ` · ${mentor.experience}y` : ""}
          </span>
        </div>
      </div>

      {/* Status + Action */}
      <div className="flex items-center gap-2 shrink-0">
        <StatusPill
          active={mentor.approved}
          activeLabel="Approved"
          pendingLabel="Pending"
        />
        <motion.button
          onClick={handleClick}
          disabled={pending}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all disabled:opacity-60 ${
            mentor.approved
              ? "bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25"
              : "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:shadow-md hover:shadow-blue-500/30"
          }`}
        >
          {pending ? "..." : mentor.approved ? "Revoke" : "Approve"}
        </motion.button>
      </div>
    </motion.li>
  );
}

function StatusPill({ active, activeLabel, pendingLabel }) {
  return (
    <div
      className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
        active
          ? "bg-green-500/20 text-green-400 border-green-500/40"
          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
      }`}
    >
      {active ? <CheckCircle size={10} /> : <Clock size={10} />}
      <span>{active ? activeLabel : pendingLabel}</span>
    </div>
  );
}

function EmptyState({ icon: Icon, message }) {
  return (
    <div className="text-center py-10 text-gray-500">
      <Icon size={28} className="mx-auto mb-2 opacity-30" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

function PanelSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.02]">
          <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 bg-white/5 rounded animate-pulse" />
            <div className="h-2.5 w-24 bg-white/5 rounded animate-pulse" />
          </div>
          <div className="h-6 w-16 bg-white/5 rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  );
}