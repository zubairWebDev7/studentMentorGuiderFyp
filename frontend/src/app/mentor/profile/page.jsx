"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

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
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
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
      <div className="flex justify-center items-center min-h-screen text-blue-300">
        Loading profile...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-400">
        {error}
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-gradient-to-br from-[#0b132b]/70 to-[#1e2a5a]/70 backdrop-blur-md rounded-2xl shadow-2xl border border-blue-700/40 p-8"
      >
        {/* Profile Image Section */}
        <div className="flex flex-col items-center relative">
          <div className="relative group">
            <img
              src={
                mentor.profilePicture?.url ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
            />

            {/* Overlay Buttons on Hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center gap-2 rounded-full">
              <label className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs cursor-pointer">
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
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs"
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          <h1 className="text-2xl font-semibold mt-4">{mentor.name}</h1>
          <p className="text-blue-400 text-sm">{mentor.profession}</p>
        </div>

        {/* Mentor Info */}
        <div className="mt-6 space-y-3 text-gray-300 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-400 font-medium">Email:</span>
            <span>{mentor.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400 font-medium">Experience:</span>
            <span>{mentor.experience} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400 font-medium">Skill Level:</span>
            <span className="capitalize">{mentor.skillLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-400 font-medium">Status:</span>
            <span
              className={`${
                mentor.approved ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {mentor.approved ? "Approved" : "Pending Approval"}
            </span>
          </div>
        </div>

        {/* Links */}
        <div className="mt-6 space-y-2">
          {mentor.githubUrl && (
            <a
              href={mentor.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 transition-colors text-center underline"
            >
              GitHub Profile
            </a>
          )}
          {mentor.linkedinUrl && (
            <a
              href={mentor.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-400 hover:text-blue-300 transition-colors text-center underline"
            >
              LinkedIn Profile
            </a>
          )}
        </div>

        <div className="mt-6 text-center text-gray-500 text-xs">
          Joined: {new Date(mentor.createdAt).toLocaleDateString()}
        </div>
      </motion.div>
    </div>
  );
}

export default Profile;
