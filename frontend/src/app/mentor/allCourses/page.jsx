"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Clock,
  DollarSign,
  Timer,
  Trash2,
  AlertCircle,
  RefreshCw,
  Plus,
  Tag,
} from "lucide-react";
import { useRouter } from "next/navigation";
import MentorNavbar from "../../components/MentorNavbar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const router = useRouter();

  const fetchMyCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/user/mentor/courses`, {
        withCredentials: true,
      });
      console.log("Fetched courses:", res.data.courses);
      setCourses(res.data.courses || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  const deleteCourse = async (courseId) => {
    setDeletingId(courseId);
    try {
      await axios.delete(
        `${API_BASE}/mentor/deleteCourse/${courseId}`,
        { withCredentials: true }
      );
      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    } catch (err) {
      alert(
        err?.response?.data?.message ||
          err.message ||
          "Failed to delete course"
      );
    } finally {
      setDeletingId(null);
      setConfirmId(null);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <MentorNavbar />

      <div className="px-6 py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-12 text-center">
            <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md w-fit">
              <BookOpen size={32} />
            </div>

            <h1 className=" text-gradient-white text-4xl md:text-5xl font-extrabold tracking-tight">
              My Courses
            </h1>

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-blue-400 rounded-full"
            />

            <p className="text-sm text-gray-400">
              Manage and track all your created courses
            </p>
          </div>

          {/* Create Button */}
          <div className="flex justify-end mb-6">
            <motion.button
              onClick={() => router.push("/mentor/createCourse")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold"
            >
              <Plus size={16} />
              Create Course
            </motion.button>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-4 py-20">
              <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-blue-300 text-sm">
                Loading your courses...
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3 p-4 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-300 mb-8"
            >
              <AlertCircle size={18} />
              {error}
              <button
                onClick={fetchMyCourses}
                className="ml-auto flex items-center gap-1 text-xs hover:text-white"
              >
                <RefreshCw size={13} /> Retry
              </button>
            </motion.div>
          )}

          {/* Empty */}
          {!loading && !error && courses.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
              <p>No courses created yet.</p>
            </div>
          )}

          {/* Course Cards */}
          <div className="flex flex-col gap-5">
            <AnimatePresence>
              {courses.map((course, idx) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="rounded-3xl bg-[#0c0c0c]/70 border border-white/10 p-6"
                >
                  <div className="flex flex-col gap-4">
                    {/* Title */}
                    <div className="flex justify-between items-start">
                      <h2 className="text-gradient-white text-xl font-bold">
                        {course.title}
                      </h2>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          course.status === "active"
                            ? "bg-green-500/20 text-green-400"
                            : course.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {course.status}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm">
                      {course.description}
                    </p>

                    {/* Meta */}
                    <div className="flex gap-3 text-xs text-gray-300">
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} />
                        ${course.price}
                      </span>

                      <span className="flex items-center gap-1">
                        <Timer size={12} />
                        {course.durationHours} hrs
                      </span>
                    </div>

                    {/* Delete */}
                    <div className="pt-3 border-t border-white/10">
                      {confirmId === course._id ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              deleteCourse(course._id)
                            }
                            className="px-3 py-1 bg-red-600 text-white rounded text-xs"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => setConfirmId(null)}
                            className="px-3 py-1 border border-white/20 rounded text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            setConfirmId(course._id)
                          }
                          className="bg-red-600 text-white text-sm cursor-pointer rounded px-3 py-1 mt-1"
                        >
                          Delete Course
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}