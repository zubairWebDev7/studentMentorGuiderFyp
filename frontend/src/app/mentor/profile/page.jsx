"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import MentorNavbar from "../../components/MentorNavbar";
import {
  Mail,
  Clock,
  BarChart2,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Camera,
  Trash2,
  CalendarDays,
  Briefcase,
} from "lucide-react";

axios.defaults.withCredentials = true;

function Profile() {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/mentor/profile`);
        setMentor(response.data.mentor);
      } catch (error) {
        console.error("Error fetching mentor profile:", error);
        setError("Unable to fetch mentor profile. Please login again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [baseURL]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const response = await axios.post(
        `${baseURL}/user/mentor/uploadProfile`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setMentor((prev) => ({
        ...prev,
        profilePicture: response.data.profilePicture,
      }));
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      await axios.delete(`${baseURL}/user/mentor/deleteProfilePicture`);
      setMentor((prev) => ({
        ...prev,
        profilePicture: { url: null, filename: null },
      }));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete profile picture.");
    }
  };

  if (loading)
    return (
      <>
        <MentorNavbar />
        <div className="flex justify-center items-center min-h-screen">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-300 text-sm">Loading profile...</p>
          </div>
        </div>
      </>
    );

  if (error)
    return (
      <>
        <MentorNavbar />
        <div className="flex justify-center items-center min-h-screen px-4">
          <div className="p-6 rounded-3xl bg-red-600/20 border border-red-500/40 text-red-300 text-center max-w-md">
            <AlertCircle className="mx-auto mb-3" size={36} />
            {error}
          </div>
        </div>
      </>
    );

  return (
    <>
      <MentorNavbar />
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-lg"
        >
          {/* Header */}
          <div className="text-center mb-8 flex flex-col items-center gap-3">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
              My Profile
            </h1>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-1 bg-blue-400 rounded-full"
            />
          </div>

          {/* Card */}
          <div className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue shadow-2xl p-8">

            {/* Avatar */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <img
                  src={
                    mentor.profilePicture?.url ||
                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="w-28 h-28 rounded-full border-4 border-blue-500 shadow-lg object-cover"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all rounded-full flex flex-col items-center justify-center gap-2">
                  <label className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 rounded-full text-xs cursor-pointer transition-all font-medium">
                    <Camera size={12} />
                    {uploading ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                  {mentor.profilePicture?.url && (
                    <button
                      onClick={handleDeleteImage}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-full text-xs transition-all font-medium"
                    >
                      <Trash2 size={12} />
                      Delete
                    </button>
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gradient-white mt-4">{mentor.name}</h2>
              <p className="text-blue-400 text-sm mt-1">{mentor.profession}</p>

              {/* Approved badge */}
              <div
                className={`mt-3 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  mentor.approved
                    ? "bg-green-500/20 text-green-400 border border-green-500/40"
                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/40"
                }`}
              >
                {mentor.approved ? (
                  <CheckCircle size={13} />
                ) : (
                  <AlertCircle size={13} />
                )}
                {mentor.approved ? "Approved Mentor" : "Pending Approval"}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-white/10 mb-6" />

            {/* Info rows */}
            <div className="space-y-4">
              <InfoRow icon={<Mail size={16} />} label="Email" value={mentor.email} />
              <InfoRow icon={<Briefcase size={16} />} label="Profession" value={mentor.profession} />
              <InfoRow icon={<Clock size={16} />} label="Experience" value={`${mentor.experience} years`} />
              <InfoRow
                icon={<BarChart2 size={16} />}
                label="Skill Level"
                value={
                  <span className="capitalize px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs border border-blue-500/30">
                    {mentor.skillLevel}
                  </span>
                }
              />
              <InfoRow
                icon={<CalendarDays size={16} />}
                label="Joined"
                value={new Date(mentor.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              />
            </div>

            {/* Social Links */}
            {(mentor.githubUrl || mentor.linkedinUrl) && (
              <>
                <div className="h-px bg-white/10 my-6" />
                <div className="flex flex-col gap-3">
                  {mentor.githubUrl && (
                    <a
                      href={mentor.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all group"
                    >
                      <Github size={18} className="text-blue-400" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        GitHub Profile
                      </span>
                    </a>
                  )}
                  {mentor.linkedinUrl && (
                    <a
                      href={mentor.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all group"
                    >
                      <Linkedin size={18} className="text-blue-400" />
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colors">
                        LinkedIn Profile
                      </span>
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}

// ── Info Row ──
const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center justify-between gap-4">
    <span className="flex items-center gap-2 text-blue-400 text-sm font-medium shrink-0">
      {icon}
      {label}
    </span>
    <span className="text-gray-300 text-sm text-right">{value}</span>
  </div>
);

export default Profile;