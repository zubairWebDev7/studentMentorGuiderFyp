"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";
import { Send, ArrowLeft, MessageCircle, Loader } from "lucide-react";
import StudentNavbar from "../../../components/StudentNavbar";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

export default function ChatPage() {
  const params = useParams();
  const router = useRouter();
  
  const mentorId = params.mentorId;
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(true);
  const [mentorName, setMentorName] = useState("Mentor");

  // Fetch previous chat history
  useEffect(() => {
    if (!mentorId) {
      router.push("/student/courses");
      return;
    }

    const fetchChatHistory = async () => {
      try {
        setLoadingChat(true);
        const res = await axios.get(
          `${API_BASE}/student/previouseChat/${mentorId}`,
          { withCredentials: true }
        );
        setMessages(res.data.chats || []);
      } catch (err) {
        console.error("Error fetching chat history:", err);
        setMessages([]);
      } finally {
        setLoadingChat(false);
      }
    };

    fetchChatHistory();
  }, [mentorId, router]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    const userMessage = {
      sender: "student",
      message: newMessage,
      timestamp: new Date(),
    };

    // Optimistically add message to UI
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage("");

    try {
      // Here you would send the message to your backend
      // Example: await axios.post(`${API_BASE}/student/sendMessage`, {...}, { withCredentials: true });
      // For now, just add a simulated mentor response
      
      setTimeout(() => {
        const mentorReply = {
          sender: "mentor",
          message: "Thanks for your message! I'll get back to you soon.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, mentorReply]);
      }, 1000);
    } catch (err) {
      console.error("Error sending message:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <StudentNavbar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="bg-[#0c0c0c]/95 border-b border-white/10 px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 rounded-full bg-blue-500/20 border border-blue-500/40">
              <MessageCircle size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gradient-white">
                {mentorName}
              </h2>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-4 bg-black/50">
          {loadingChat ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-3">
                <Loader size={32} className="text-blue-400 animate-spin" />
                <p className="text-gray-400 text-sm">Loading chat history...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageCircle size={48} className="text-blue-400 opacity-30 mx-auto mb-3" />
                <p className="text-gray-400">No messages yet. Start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${msg.sender === "student" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2.5 rounded-2xl ${
                    msg.sender === "student"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white/10 text-gray-200 rounded-bl-none border border-white/20"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "student" ? "text-blue-100" : "text-gray-400"}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Input Area */}
        <div className="bg-[#0c0c0c]/95 border-t border-white/10 px-6 py-4">
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-blue-500/50 disabled:opacity-50 transition-colors"
            />
            <motion.button
              type="submit"
              disabled={loading || !newMessage.trim()}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-semibold text-white"
            >
              {loading ? (
                <Loader size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
