"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  MessageCircle,
  DollarSign,
  Timer,
  AlertCircle,
  RefreshCw,
  Tag,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
import StudentNavbar from "../../components/StudentNavbar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_BASE}/user/student/courses`, { withCredentials: true });
      setCourses(res.data.courses || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChatWithMentor = (mentorId) => {
    router.push(`/student/chat/${mentorId}`);
  };

  return (
    <div className="min-h-screen w-full">
      <StudentNavbar />
      <div className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col items-center gap-3 mb-12 text-center">
            <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md w-fit">
              <BookOpen size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
              Available Courses
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-blue-400 rounded-full"
            />
            <p className="text-gradient-white text-sm mt-1">
              Explore and learn from expert mentors
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
              <p className="mb-4">No courses available yet.</p>
            </div>
          )}

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {courses.map((course, idx) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.5, delay: idx * 0.07 }}
                  className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all overflow-hidden flex flex-col"
                >
                  {/* Thumbnail */}
                  <div className="relative h-48 overflow-hidden">
                    {course.thumbnail?.url ? (
                      <img
                        src={course.thumbnail.url}
                        alt={course.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
                        <BookOpen size={40} className="text-blue-300 opacity-50" />
                      </div>
                    )}
                    {/* Status Badge */}
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/40">
                      Active
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col gap-3 flex-grow">
                    {/* Title */}
                    <div>
                      <h2 className="text-lg font-bold text-gradient-white line-clamp-2">{course.title}</h2>
                      {course.subtitle && (
                        <p className="text-blue-400 text-xs mt-1 line-clamp-1">{course.subtitle}</p>
                      )}
                    </div>

                    {/* Description */}
                    {course.description && (
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">
                        {course.description}
                      </p>
                    )}

                    {/* Meta Pills */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        <DollarSign size={11} className="text-blue-400" />
                        ${course.price}
                      </span>
                      <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
                        <Timer size={11} className="text-blue-400" />
                        {course.durationHours} hrs
                      </span>
                    </div>

                    {/* Tags */}
                    {course.tags && course.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {course.tags.slice(0, 3).map((tag, tidx) => (
                          <span key={tidx} className="flex items-center gap-0.5 px-2 py-1 rounded-lg bg-blue-500/20 border border-blue-500/40 text-blue-300 text-xs">
                            <Tag size={9} />
                            {tag}
                          </span>
                        ))}
                        {course.tags.length > 3 && (
                          <span className="text-xs text-blue-400">+{course.tags.length - 3}</span>
                        )}
                      </div>
                    )}

                    {/* Syllabus Preview */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="pt-2 border-t border-white/10">
                        <p className="text-xs font-semibold text-gray-400 mb-1.5">
                          Sessions ({course.syllabus.length})
                        </p>
                        <ul className="space-y-1 max-h-20 overflow-y-auto">
                          {course.syllabus.slice(0, 2).map((item, sidx) => (
                            <li key={sidx} className="text-xs text-gray-400 flex items-start gap-1.5">
                              <span className="text-blue-400 mt-0.5">→</span>
                              <span>
                                {item.title}
                                {item.durationMinutes > 0 && ` (${item.durationMinutes}m)`}
                              </span>
                            </li>
                          ))}
                          {course.syllabus.length > 2 && (
                            <li className="text-xs text-blue-400 pt-1">+ {course.syllabus.length - 2} more</li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Mentor Info & Chat Button */}
                    <div className="pt-3 border-t border-white/10 mt-auto">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <div className="p-1.5 rounded-full bg-blue-500/20 border border-blue-500/40">
                            <User size={14} className="text-blue-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs text-gray-400">Mentor</p>
                            <p className="text-sm font-semibold text-gradient-white line-clamp-1">
                              {course.mentor?.name || "Unknown"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <motion.button
                        onClick={() => handleChatWithMentor(course.mentor._id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all font-semibold text-white text-sm"
                      >
                        <MessageCircle size={16} />
                        Chat with Mentor
                      </motion.button>
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