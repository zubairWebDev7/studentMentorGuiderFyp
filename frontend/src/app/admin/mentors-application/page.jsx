"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  RefreshCw,
  Trash2,
  AlertTriangle,
  Github,
  Linkedin,
  Briefcase,
  Mail,
} from "lucide-react";
import AdminNavbar from "../../components/AdminNavbar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

export default function MentorManagement() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/mentors`, {
        withCredentials: true,
      });
      setMentors(res.data.mentors || []);
    } catch (err) {
      console.error("Error fetching mentors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const handleToggleApproval = async (id) => {
    setTogglingId(id);
    try {
      await axios.put(
        `${API_BASE}/admin/mentors/${id}`,
        {},
        { withCredentials: true }
      );
      setMentors((prev) =>
        prev.map((m) => (m._id === id ? { ...m, approved: !m.approved } : m))
      );
    } catch (err) {
      alert(err?.response?.data?.message || "Error toggling approval");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(`${API_BASE}/admin/mentors/${id}`, {
        withCredentials: true,
      });
      setMentors((prev) => prev.filter((m) => m._id !== id));
      setConfirmDelete(null);
    } catch (err) {
      alert(err?.response?.data?.message || "Error deleting mentor");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen w-full px-6 py-12 text-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
                Mentor Management
              </h1>
              <p className="text-gray-400 mt-2">
                Approve, revoke, or remove mentor accounts.
              </p>
            </div>

            <motion.button
              onClick={fetchMentors}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#0c0c0c]/70 border border-gradient-blue text-white text-sm font-medium hover:bg-blue-500/10 transition-all disabled:opacity-60 w-fit"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              Refresh
            </motion.button>
          </motion.div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-72 rounded-3xl bg-[#0c0c0c]/70 border border-white/5 animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && mentors.length === 0 && (
            <div className="text-center py-20 text-gray-500">
              <p>No mentors found.</p>
            </div>
          )}

          {!loading && mentors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <AnimatePresence>
                {mentors.map((mentor, idx) => (
                  <motion.div
                    key={mentor._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: idx * 0.04 }}
                    whileHover={{ y: -4 }}
                    className="relative rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue p-6 flex flex-col"
                  >
                    <div
                      className={`absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        mentor.approved
                          ? "bg-green-500/20 text-green-400 border-green-500/40"
                          : "bg-yellow-500/20 text-yellow-400 border-yellow-500/40"
                      }`}
                    >
                      {mentor.approved ? <CheckCircle size={10} /> : <XCircle size={10} />}
                      {mentor.approved ? "Approved" : "Pending"}
                    </div>

                    <div className="flex flex-col items-center mb-4">
                      {mentor.profilePicture?.url ? (
                        <img
                          src={mentor.profilePicture.url}
                          alt={mentor.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/50 mb-3"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 flex items-center justify-center text-white font-bold text-2xl mb-3 border-2 border-blue-500/50">
                          {mentor.name?.charAt(0).toUpperCase() || "M"}
                        </div>
                      )}
                      <h2 className="text-lg font-bold text-white text-center truncate max-w-full">
                        {mentor.name}
                      </h2>
                      <p className="text-blue-400 text-sm mt-0.5 truncate max-w-full">
                        {mentor.profession}
                      </p>
                    </div>

                    <div className="space-y-2 text-xs text-gray-400 mb-4 flex-grow">
                      <div className="flex items-center gap-2 truncate">
                        <Mail size={12} className="text-blue-400 shrink-0" />
                        <span className="truncate">{mentor.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase size={12} className="text-blue-400 shrink-0" />
                        <span>
                          {mentor.experience} yrs ·{" "}
                          <span className="capitalize">{mentor.skillLevel}</span>
                        </span>
                      </div>
                      <div className="flex gap-3 pt-1">
                        {mentor.githubUrl ? (
                        <a  
                            href={mentor.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <Github size={12} /> GitHub
                          </a>
                        ) : null}
                        {mentor.linkedinUrl ? (
                        <a  
                            href={mentor.linkedinUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                          >
                            <Linkedin size={12} /> LinkedIn
                          </a>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        onClick={() => handleToggleApproval(mentor._id)}
                        disabled={togglingId === mentor._id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-60 ${
                          mentor.approved
                            ? "bg-yellow-500/15 text-yellow-400 border border-yellow-500/40 hover:bg-yellow-500/25"
                            : "bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:shadow-md hover:shadow-blue-500/30"
                        }`}
                      >
                        {togglingId === mentor._id ? (
                          <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        ) : mentor.approved ? (
                          <>
                            <XCircle size={13} /> Revoke
                          </>
                        ) : (
                          <>
                            <CheckCircle size={13} /> Approve
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        onClick={() => setConfirmDelete(mentor)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex items-center justify-center w-10 rounded-xl bg-red-500/15 text-red-400 border border-red-500/30 hover:bg-red-500/25 transition-all"
                        title="Delete mentor"
                      >
                        <Trash2 size={14} />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {confirmDelete && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !deletingId && setConfirmDelete(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md z-[201] bg-[#0a0a0a] border border-red-500/30 rounded-3xl p-6 shadow-2xl shadow-red-500/10"
            >
              <div className="flex flex-col items-center text-center gap-3 mb-5">
                <div className="p-3 rounded-full bg-red-500/15 border border-red-500/30">
                  <AlertTriangle size={28} className="text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white">Delete mentor?</h3>
                <p className="text-sm text-gray-400">
                  You are about to permanently delete{" "}
                  <span className="text-white font-semibold">
                    {confirmDelete.name}
                  </span>
                  . This will also remove all of their courses. This action cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setConfirmDelete(null)}
                  disabled={!!deletingId}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-all disabled:opacity-60"
                >
                  Cancel
                </button>
                <motion.button
                  onClick={() => handleDelete(confirmDelete._id)}
                  disabled={!!deletingId}
                  whileHover={{ scale: deletingId ? 1 : 1.02 }}
                  whileTap={{ scale: deletingId ? 1 : 0.98 }}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-all disabled:opacity-60"
                >
                  {deletingId ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 size={14} /> Delete permanently
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}