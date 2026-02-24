"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BookOpen, User, CheckCircle, Clock, RefreshCw, AlertCircle } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [togglingId, setTogglingId] = useState(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/admin/courses`, { withCredentials: true });
      setCourses(res.data.courses || []);
    } catch (err) {
      setError(err?.message || "Error fetching courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const toggleStatus = async (courseId) => {
    setTogglingId(courseId);
    try {
      const res = await axios.put(`${API_BASE}/admin/courses/${courseId}`, {}, { withCredentials: true });
      const course = res.data.course;
      setCourses((prev) => prev.map((c) => (c._id === course._id ? course : c)));
    } catch (err) {
      alert(err?.response?.data?.message || err.message || "Failed to update status");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="min-h-screen w-full px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center">
          <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md w-fit">
            <BookOpen size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
            Course Applications
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-400 rounded-full"
          />
          <p className="text-gradient-white text-sm mt-1">
            Review and manage all submitted mentor courses
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-20">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-300 text-sm">Loading courses...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-300 mb-8"
          >
            <AlertCircle size={18} />
            {error}
            <button
              onClick={fetchCourses}
              className="ml-auto flex items-center gap-1 text-xs text-red-300 hover:text-white transition-colors"
            >
              <RefreshCw size={13} /> Retry
            </button>
          </motion.div>
        )}

        {/* Empty */}
        {!loading && !error && courses.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
            <p>No course applications found.</p>
          </div>
        )}

        {/* Course Cards */}
        <div className="flex flex-col gap-5">
          {courses.map((course, idx) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all p-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6"
            >
              {/* Left — info */}
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-gradient-white truncate">{course.title}</h2>
                {course.subtitle && (
                  <p className="text-blue-400 text-sm mt-0.5">{course.subtitle}</p>
                )}
                {course.description && (
                  <p className="text-gray-400 text-sm mt-3 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-4 text-gray-500 text-xs">
                  <User size={13} className="text-blue-400" />
                  <span>
                    Mentor:{" "}
                    <span className="text-gray-300">
                      {course.mentor?.name || course.mentor?.email || "Unknown"}
                    </span>
                  </span>
                </div>
              </div>

              {/* Right — status + action */}
              <div className="flex flex-col items-start md:items-end gap-4 shrink-0">
                {/* Status badge */}
                <div
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                    course.status === "active"
                      ? "bg-green-500/20 text-green-400 border-green-500/40"
                      : "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                  }`}
                >
                  {course.status === "active" ? (
                    <CheckCircle size={13} />
                  ) : (
                    <Clock size={13} />
                  )}
                  <span className="capitalize">{course.status}</span>
                </div>

                {/* Toggle button */}
                <motion.button
                  onClick={() => toggleStatus(course._id)}
                  disabled={togglingId === course._id}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 16px rgba(59,130,246,0.5)" }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold text-white text-sm disabled:opacity-60"
                >
                  {togglingId === course._id ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={14} />
                      Toggle Status
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}