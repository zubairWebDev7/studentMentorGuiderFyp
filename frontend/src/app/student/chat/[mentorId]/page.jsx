
// for student to mentor messages 
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../../../store/chatStore";
import { useParams } from "next/navigation";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";

export default function ChatPage() {
  const { mentorId } = useParams();
  const { socket, connectSocket, messages, startConversation, sendMessage, clearMessages, setCurrentChatPartner } =
    useChatStore();
  const [text, setText] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [mentorInfo, setMentorInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const { mentor } = useAuthStore();

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  const studentId =
    typeof window !== "undefined" ? localStorage.getItem("studentId") : null;

  // ✅ Clear messages and set current chat partner when mentor changes
  useEffect(() => {
    if (mentorId) {
      clearMessages();
      setCurrentChatPartner(mentorId);
    }
  }, [mentorId, clearMessages, setCurrentChatPartner]);

  // ✅ Connect socket
  useEffect(() => {
    if (studentId && !socket) {
      console.log("the chaanet ");

      connectSocket(studentId);
    }
  }, [studentId, socket, connectSocket]);

  // ✅ Fetch previous chat
  useEffect(() => {
    const fetchPreviousMessages = async () => {
      try {
        setLoading(true);
        console.log("call for the previouse chat", studentId, mentorId);

        const res = await axios.get(
          `${baseURL}/user/student/previouseChat/${mentorId}`,
          { withCredentials: true }
        );
        console.log("call for the previouse chat respomse", res);
        const fetched = res.data?.messages || [];
        const sorted = fetched.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setPreviousMessages(sorted);
        setMentorInfo(res.data?.mentor || null);
      } catch (err) {
        console.error("Error fetching chat:", err);
      } finally {
        setLoading(false);
      }
    };
    if (mentorId && studentId) {
      console.log("caller function");

      fetchPreviousMessages();
    }
  }, [mentorId, studentId]);
  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // ✅ Start conversation
  useEffect(() => {
    if (studentId && mentorId && socket) {
      startConversation(studentId, mentorId);
    }
  }, [studentId, mentorId, socket, startConversation]);

  // ✅ Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, previousMessages]);

  // ✅ Send message handler (with local timestamp fix)
  const handleSend = () => {
    if (!text.trim()) return;
    const localMessage = {
      senderId: studentId,
      receiverId: mentorId,
      text,
      createdAt: new Date().toISOString(), // ✅ local time to fix "Invalid Date"
    };
    sendMessage(studentId, mentorId, text);
    // setPreviousMessages((prev) => [...prev, localMessage]);
    setText("");
  };

  // ✅ Combine all messages
  const allMessages = [
    ...previousMessages,
    ...messages.filter(
      (m) => !previousMessages.some((pm) => pm._id && pm._id === m._id)
    ),
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  return (
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-[#090909] via-[#0c0f1a] to-[#0b0b0b] text-white">
      <div className="flex flex-col w-full md:w-2/3 lg:w-[50%] border-x border-blue-500/20 bg-[#0e0e0e]/90 backdrop-blur-md shadow-2xl rounded-lg overflow-hidden">
        {/* ✅ Header */}
        <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#111] border-b border-blue-500/30 px-4 py-3 shadow-md">
          {mentorInfo?.profilePicture ? (
            <img
              src={mentorInfo.profilePicture}
              alt={mentorInfo.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/40"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
              👤
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-lg">{mentorInfo?.name || "Mentor"}</span>

          </div>
        </div>

        {/* ✅ Messages */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin scrollbar-thumb-blue-600/30">
          {loading ? (
            <p className="text-center text-gray-400 mt-10">Loading chat...</p>
          ) : allMessages.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No messages yet. Start a conversation 👋</p>
          ) : (
            allMessages.map((msg, i) => {
              const isStudent = msg.senderId === studentId;
              const time =
                msg.createdAt && !isNaN(new Date(msg.createdAt))
                  ? new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  : "";

              return (
                <div key={msg._id || i} className={`flex ${isStudent ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-3 rounded-2xl max-w-[75%] md:max-w-[60%] break-words shadow-md ${isStudent
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-[#1b1b1b] text-gray-100 rounded-bl-none"
                      }`}
                  >
                    <p className="leading-relaxed">{msg.text}</p>
                    <span className="text-[10px] text-gray-300 block text-right mt-1">{time}</span>
                  </div>
                </div>
              );
            })
          )}
          <div ref={scrollRef} />
        </div>

        {/* ✅ Input */}
        <div className="flex items-center p-4 border-t border-blue-500/20 bg-[#101010]/95">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none px-4 py-2 text-white border border-blue-500/30 rounded-full focus:border-blue-500"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="ml-3 px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-full font-medium transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
