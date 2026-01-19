"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

export default function MentorManagement() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("before");
  
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
console.log("after ", baseURL)
  // Fetch mentors
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        console.log("the token", baseURL);
        
        const res = await axios.get(`${baseURL}/admin/mentors`, {
          withCredentials: true,
        });
        setMentors(res.data.mentors || []);
      } catch (err) {
        console.error("Error fetching mentors:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  // Toggle approval
  const handleToggleApproval = async (id) => {
    try {
      const res = await axios.put(
        `${baseURL}/admin/mentors/${id}`,
        {},
        { withCredentials: true }
      );

      setMentors((prev) =>
        prev.map((m) =>
          m._id === id ? { ...m, approved: !m.approved } : m
        )
      );
      console.log(res.data.message);
    } catch (err) {
      console.error("Error toggling approval:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <RefreshCw className="animate-spin w-8 h-8 mb-3 text-blue-400" />
        <p>Loading mentors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090f1a] via-[#0a1228] to-[#030712] text-white p-8">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-400">
        Mentor Management Dashboard
      </h1>

      {mentors.length === 0 ? (
        <p className="text-center text-gray-400">No mentors found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((mentor) => (
            <motion.div
              key={mentor._id}
              whileHover={{ scale: 1.03 }}
              className="bg-[#0b132b]/50 border border-blue-700/20 backdrop-blur-md p-5 rounded-xl shadow-md hover:shadow-lg flex flex-col items-center text-center transition-all"
            >
              <img
                src={
                  mentor.profilePicture?.url || "null"
                //   "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-16 h-16 rounded-full border-2 border-blue-500 mb-3 object-cover"
              />

              <h2 className="text-lg font-semibold mb-1">{mentor.name}</h2>
              <p className="text-sm text-blue-300 mb-1">{mentor.profession}</p>
              <p className="text-xs text-gray-400 mb-2">{mentor.email}</p>

              <div className="flex gap-2 mb-2 text-sm">
                <a
                  href={mentor.githubUrl}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  GitHub
                </a>
                <span className="text-gray-500">|</span>
                <a
                  href={mentor.linkedinUrl}
                  target="_blank"
                  className="text-blue-400 hover:underline"
                >
                  LinkedIn
                </a>
              </div>

              <p className="text-gray-300 text-xs mb-4">
                Experience:{" "}
                <span className="text-blue-400">{mentor.experience} yrs</span>
              </p>

              <button
                onClick={() => handleToggleApproval(mentor._id)}
                className={`flex items-center justify-center gap-1 w-full py-2 text-sm rounded-md font-medium transition-all ${
                  mentor.approved
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {mentor.approved ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Approved
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4" />
                    Deapproved
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
