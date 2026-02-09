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
  Award,
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
        setStudent(response.data.student);
      } catch (err) {
        console.error("Profile Fetch Error:", err);
        setError("Failed to load profile. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white text-lg">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>Loading profile...</span>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-red-400 text-lg">
        {error}
      </div>
    );

  return (
    <div className="min-h-screen  text-white">
      <StudentNavbar />

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-28 h-28 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg">
            {/* Replace with student.photo if available */}
            <img
              src="/assets/student-avatar.png"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-4xl font-bold mt-4">{student.name}</h1>
          <p className="text-blue-300 mt-1">{student.email}</p>
          <p className="text-gray-300 mt-2 max-w-xl">{student.bio || "No bio provided."}</p>
        </div>

        {/* Info Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <ProfileCard icon={<GraduationCap />} label="Education" value={student.educationLevel} />
          <ProfileCard icon={<Target />} label="Career Goals" value={student.careerGoals} />
          <ProfileCard icon={<Languages />} label="Languages" value={student.languagePreference} />
          <ProfileCard icon={<Mail />} label="Email" value={student.email} />
          <ProfileCard icon={<BookOpen />} label="Courses Enrolled" value={student.courses?.length || 0} />
          <ProfileCard icon={<Award />} label="Achievements" value={student.achievements?.length || 0} />
        </div>

        {/* Skills / Interests */}
        {student.interests?.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-400 mb-4 flex items-center gap-2">
              <Sparkles size={20} /> Interests & Skills
            </h2>
            <div className="flex flex-wrap gap-3">
              {student.interests.map((interest, idx) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600/40 to-blue-500/20 border border-blue-500/30 rounded-full text-sm font-medium hover:scale-105 transition-transform"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements / Badges */}
        {student.achievements?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <Award size={20} /> Achievements
            </h2>
            <div className="flex flex-wrap gap-4">
              {student.achievements.map((ach, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/70 p-4 rounded-xl border border-green-500/30 shadow-lg hover:shadow-xl transition-all"
                >
                  <p className="text-green-300 font-semibold">{ach.title}</p>
                  <p className="text-gray-300 text-sm">{ach.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const ProfileCard = ({ icon, label, value }) => (
  <div className="flex flex-col items-center justify-center p-6 bg-gray-800/70 rounded-2xl border border-blue-500/20 shadow-md hover:shadow-lg transition-all">
    <div className="text-blue-400 mb-2">{icon}</div>
    <p className="text-gray-300 text-sm uppercase tracking-wide mb-1">{label}</p>
    <p className="text-white font-medium text-lg text-center">{value || "—"}</p>
  </div>
);
