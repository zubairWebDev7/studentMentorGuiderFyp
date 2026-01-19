"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpen,
  GraduationCap,
  Mail,
  Languages,
  Target,
  Sparkles,
} from "lucide-react";
import StudentNavbar from "../../components/StudentNavbar";

export default function StudentProfilePage() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseURL}/user/student/profile`, {
          withCredentials: true,
        });
        console.log("✅ Student Profile:", response.data);
        setStudent(response.data.student);
      } catch (err) {
        console.error("❌ Profile Fetch Error:", err);
        setError("Failed to load student profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // Loader
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] text-white text-lg">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );

  // Error
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] text-red-400 text-lg">
        {error}
      </div>
    );

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center">
      <StudentNavbar />
      <main className="w-full max-w-4xl px-6 md:px-10 py-20 relative">
        {/* Container Card */}
        <div className="relative bg-[#0d0d0d]/80 border border-blue-500/30 rounded-[32px] backdrop-blur-xl shadow-[0_0_30px_-10px_rgba(0,0,255,0.2)] p-10 overflow-hidden">
          {/* Blue Glow Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent rounded-[32px] pointer-events-none" />

          {/* Header */}
          <div className="relative text-center mb-12">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-600/40 to-blue-400/20 border border-blue-500/40 rounded-full flex items-center justify-center shadow-inner">
              <GraduationCap size={42} className="text-blue-300" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mt-5 tracking-tight">
              {student.name}
            </h1>
            <p className="text-blue-300 mt-1 text-sm">{student.email}</p>
          </div>

          {/* Info Grid */}
          <div className="grid sm:grid-cols-2 gap-6 relative z-10">
            <ProfileCard
              icon={<BookOpen size={20} />}
              label="Education Level"
              value={student.educationLevel}
            />
            <ProfileCard
              icon={<Target size={20} />}
              label="Career Goals"
              value={student.careerGoals}
            />
            <ProfileCard
              icon={<Languages size={20} />}
              label="Language Preference"
              value={student.languagePreference}
            />
            <ProfileCard
              icon={<Mail size={20} />}
              label="Email"
              value={student.email}
            />
          </div>

          {/* Interests Section */}
          {student.interests?.length > 0 && (
            <div className="relative z-10 mt-12">
              <h3 className="text-lg font-semibold text-blue-300 mb-4 flex items-center gap-2">
                <Sparkles size={18} /> Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {student.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600/40 to-blue-500/20 border border-blue-500/40 rounded-full hover:from-blue-600/60 hover:to-blue-400/20 transition-all duration-200 shadow-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <p className="mt-12 text-center text-green-400/80 text-sm font-medium">
            ✅ Profile fetched successfully
          </p>
        </div>
      </main>
    </div>
  );
}

// 🔹 Profile Card Component
const ProfileCard = ({ icon, label, value }) => (
  <div className="bg-[#0f0f0f]/70 rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 p-6 shadow-[0_0_15px_-5px_rgba(0,0,255,0.3)]">
    <div className="flex items-center gap-3 mb-2 text-blue-300">
      {icon}
      <span className="text-sm uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-gray-200 text-base font-medium leading-relaxed">
      {value || "—"}
    </p>
  </div>
);
