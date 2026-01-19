"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useStudentAuth } from "../../store/studentAuth"
import StudentNavbar from "../../components/StudentNavbar";
import { Github, Linkedin, Briefcase, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentMentorsPage() {
    const { mentors, loading, error, fetchAllMentors } = useStudentAuth();
    const router = useRouter()
    const navigaetThepage = (id) => {
        console.log("push the router");

        router.push(router.push(`/student/chat/${id}`))
    }

    useEffect(() => {
        fetchAllMentors();
    }, [fetchAllMentors]);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] text-white">
                <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    <span>Loading mentors...</span>
                </div>
            </div>
        );

    if (error)
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#0a0a0a] text-red-400">
                {error.message || "Failed to load mentors."}
            </div>
        );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <StudentNavbar />
            <div className="max-w-6xl mx-auto px-6 py-20">
                <h1 className="text-4xl font-bold text-center mb-12 text-blue-300">
                    Verified Mentors
                </h1>

                {mentors.length === 0 ? (
                    <p className="text-center text-gray-400">No verified mentors available.</p>
                ) : (
                    <motion.div
                        layout
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {mentors.map((mentor, idx) => (
                            <motion.div
                                key={mentor._id || idx}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative group bg-[#0f0f0f]/70 border border-blue-500/20 hover:border-blue-500/50 p-6 rounded-2xl backdrop-blur-xl shadow-[0_0_20px_-5px_rgba(0,0,255,0.3)] transition-all duration-300"
                            >
                                {/* Mentor Avatar */}
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/40 flex items-center justify-center overflow-hidden">
                                        {mentor.profilePicture?.url ? (
                                            <img
                                                src={
                                                    mentor.profilePicture.url.startsWith("http")
                                                        ? mentor.profilePicture.url
                                                        : `http://localhost:4000${mentor.profilePicture.url}`
                                                }
                                                alt={mentor.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <Briefcase className="text-blue-400" size={32} />
                                        )}
                                    </div>
                                </div>

                                {/* Mentor Info */}
                                <h2 className="text-xl font-semibold text-center text-white">
                                    {mentor.name}
                                </h2>
                                <p className="text-center text-blue-400 text-sm">
                                    {mentor.profession}
                                </p>

                                <div className="mt-4 text-sm text-gray-300 space-y-1 text-center">
                                    <p>
                                        <strong>Experience:</strong> {mentor.experience} years
                                    </p>
                                    <p className="flex justify-center items-center gap-1">
                                        <Star size={14} className="text-yellow-400" />{" "}
                                        <span className="capitalize">{mentor.skillLevel}</span>
                                    </p>
                                </div>

                                {/* Links */}
                                <div className="flex justify-center gap-4 mt-5">
                                    <a
                                        href={mentor.githubUrl}
                                        target="_blank"
                                        className="text-gray-400 hover:text-white transition-colors"
                                    >
                                        <Github size={20} />
                                    </a>

                                    <a
                                        href={mentor.linkedinUrl}
                                        target="_blank"
                                        className="text-gray-400 hover:text-blue-400 transition-colors"
                                    >
                                        <Linkedin size={20} />
                                    </a>

                                    {/* ✅ Fixed chat button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => navigaetThepage(mentor._id)}
                                        className="px-4 py-2 cursor-pointer bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-blue-500/30 hover:from-blue-500 hover:to-indigo-600 transition-all duration-300"
                                    >
                                        Chat with
                                    </motion.button>
                                </div>

                                {/* ✅ Prevent overlay blocking clicks */}
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl pointer-events-none" />
                                        
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
