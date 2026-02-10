"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Sparkles,
  Send,
  Loader2,
  User,
  Briefcase,
  Award,
  MessageSquare,
  ChevronRight,
  Zap,
} from "lucide-react";
import StudentNavbar from "../../components/StudentNavbar";

export default function AISuggestionPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await axios.post(
        `${baseURL}/user/student/AISuggestion`,
        { prompt },
        { withCredentials: true }
      );

      setResult(response.data);
    } catch (err) {
      console.error("AI Suggestion Error:", err);
      setError(
        err.response?.data?.message || "Failed to get suggestions. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative">
      <StudentNavbar />

      <main className="max-w-6xl mx-auto px-6 py-16 flex flex-col gap-16">
        {/* Hero Section */}
        <section className="text-center flex flex-col items-center gap-6 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md mb-2"
          >
            <Sparkles size={32} />
          </motion.div>

          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight text-gradient-white"
          >
            AI Mentor Matchmaker
          </motion.h1>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 120 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-400 rounded-full mx-auto"
          />

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl text-gradient-white text-lg md:text-xl"
          >
            Tell us what you're looking for, and our AI will recommend the perfect mentors based on your profile and goals.
          </motion.p>
        </section>

        {/* Input Form */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto w-full"
        >
          <form onSubmit={handleSubmit}>
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Example: I want to learn web development and build my portfolio..."
                className="w-full px-6 py-5 bg-[#0c0c0c]/70 backdrop-blur-sm border border-gradient-blue rounded-3xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[140px] shadow-lg transition-all"
                disabled={loading}
              />
              <motion.button
                type="submit"
                disabled={loading || !prompt.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute bottom-5 right-5 px-6 py-3 bg-gradient-to-r from-blue-800 to-blue-400 rounded-2xl font-semibold hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg text-white"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Get Suggestions
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto p-5 bg-red-500/20 backdrop-blur-sm border border-red-500/50 rounded-3xl text-red-300 text-center"
          >
            {error}
          </motion.div>
        )}

        {/* Quick Prompts */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <p className="text-gray-400 text-sm mb-4 text-center flex items-center justify-center gap-2">
              <Zap size={16} className="text-blue-400" />
              Not sure what to ask? Try these:
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "I want to learn web development",
                "Looking for career guidance in AI/ML",
                "Need help with academic research",
                "Want to improve my coding skills",
              ].map((suggestion, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPrompt(suggestion)}
                  className="px-4 py-2 bg-[#0c0c0c]/70 backdrop-blur-sm border border-gradient-blue rounded-full text-sm text-gray-300 hover:bg-blue-400/20 transition-all"
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Response */}
        {result && (
          <div className="space-y-12">
            {/* AI Suggestion */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-[#0c0c0c]/70 backdrop-blur-sm border border-gradient-blue rounded-3xl p-8 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white">
                  <MessageSquare size={24} />
                </div>
                <h2 className="text-3xl font-bold text-gradient-white">
                  AI Recommendation
                </h2>
              </div>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-200 leading-relaxed whitespace-pre-line text-lg">
                  {result.aiSuggestion}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700/50">
                <p className="text-sm text-gray-400 flex items-center gap-2">
                  <Sparkles size={16} className="text-blue-400" />
                  Found {result.totalFound} matching mentor{result.totalFound !== 1 ? 's' : ''}
                </p>
              </div>
            </motion.div>

            {/* Recommended Mentors */}
            {result.recommendedMentors?.length > 0 && (
              <section>
                <motion.h2
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl font-bold text-center mb-12 text-gradient-white drop-shadow-md flex items-center justify-center gap-3"
                >
                  <Award size={32} className="text-blue-400" />
                  Recommended Mentors
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {result.recommendedMentors.map((mentor, idx) => (
                    <MentorCard key={mentor._id} mentor={mentor} index={idx} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

// Mentor Card Component
const MentorCard = ({ mentor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }}
    whileHover={{ scale: 1.05, rotate: 1 }}
    className="flex flex-col p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl transition-all group"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 flex items-center justify-center text-white font-bold text-2xl shadow-lg">
        {mentor.name?.charAt(0).toUpperCase() || "M"}
      </div>
      <motion.div
        whileHover={{ x: 5 }}
        className="text-gray-500 group-hover:text-blue-400 transition-colors"
      >
        <ChevronRight size={24} />
      </motion.div>
    </div>

    <h3 className="text-2xl font-bold text-gradient-white mb-4">{mentor.name}</h3>

    <div className="space-y-3 mb-6 flex-grow">
      <div className="flex items-center gap-3 text-gray-300">
        <Briefcase size={18} className="text-blue-400" />
        <span className="text-sm">{mentor.profession || "Professional"}</span>
      </div>
      <div className="flex items-center gap-3 text-gray-300">
        <Award size={18} className="text-green-400" />
        <span className="text-sm">{mentor.experience} years experience</span>
      </div>
      <div className="flex items-center gap-3 text-gray-300">
        <User size={18} className="text-purple-400" />
        <span className="text-sm capitalize">{mentor.skillLevel || "Expert"}</span>
      </div>
    </div>

    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full py-3 rounded-2xl border border-gradient-blue hover:bg-blue-400/20 transition-all font-semibold text-gradient-white"
    >
      View Profile
    </motion.button>
  </motion.div>
);