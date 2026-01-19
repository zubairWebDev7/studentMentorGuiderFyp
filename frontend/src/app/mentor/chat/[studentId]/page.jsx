"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useChatStore } from "../../../store/chatStore";
import axios from "axios";
import { useAuthStore } from "../../../store/useAuthStore";
import '../../../../../global1.css'


export default function MentorChatPage() {
  const { studentId } = useParams();
  const {
    socket,
    connectSocket,
    messages,
    startConversation,
    sendMessage,
  } = useChatStore();

  const [text, setText] = useState("");
  const [studentInfo, setStudentInfo] = useState(null);
  const [previousMessages, setPreviousMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const {mentor, responseData} = useAuthStore();
  console.log("user response ", responseData);
  
  const scrollRef = useRef(null);

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";
  if(!mentor) {
    console.log("Mentor not found")
 
  }   
  const mentorId = mentor?._id

  // ✅ Connect socket
  useEffect(() => {
    console.log("Conecting socket")
    if (mentorId && !socket) {
      console.log("Mentor id found no socket connection")
      connectSocket(mentorId)
    };
  }, [mentorId, socket, connectSocket]);

  // ✅ Start conversation when socket is ready
  useEffect(() => {
    if (mentorId && studentId && socket) {

      startConversation(mentorId, studentId);
    }
  }, [mentorId, studentId, socket, startConversation]);

  // ✅ Fetch previous messages
  useEffect(() => {
    const fetchChat = async () => {
      try {
        console.log("fetching teh chat");
        
        setLoading(true);
        const res = await axios.get(
          `${baseURL}/user/mentor/previouseChat/${studentId}`,
          { withCredentials: true }
        );

        const fetched = res.data?.messages || [];
        console.log("fetching teh chat",fetched);
        const sorted = fetched.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setPreviousMessages(sorted);
        setStudentInfo(res.data?.student || null);
      } catch (err) {
        console.error("Error fetching previous chat:", err);
      } finally {
        setLoading(false);
      }
    };

    if (studentId) fetchChat();
  }, [studentId]);

  // ✅ Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, previousMessages]);

  // ✅ Handle sending a message
  const handleSend = () => {
    console.log("sending messae to student")
    if (!text.trim()) return;

    const localMessage = {
      senderId: mentorId,
      receiverId: studentId,
      text,
      createdAt: new Date().toISOString(),
    };

    sendMessage(mentorId, studentId, text);
    // setPreviousMessages((prev) => [...prev, localMessage]);
    setText("");
  };

  // ✅ Combine previous and live messages
  const allMessages = [
    ...previousMessages,
    ...messages.filter(
      (m) => !previousMessages.some((pm) => pm._id && pm._id === m._id)
    ),
  ].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

return (
  <div className="flex justify-center min-h-screen bg-gradient-to-br from-[#050507] via-[#0b1020] to-[#040404] text-white">
    <div className="flex flex-col w-full md:w-2/3 lg:w-[42%] bg-[#0d0f18]/95 backdrop-blur-xl rounded-3xl shadow-[0_0_45px_rgba(0,0,0,0.85)] border border-blue-500/15 overflow-hidden h-[90vh]">

      {/* 🔷 HEADER */}
      <div className="flex items-center gap-4 px-6 py-4 bg-[#0b0e1a]/90 border-b border-blue-500/20 sticky top-0 z-20">
        <div className="relative">
          {studentInfo?.profilePicture?.url ? (
            <img
              src={studentInfo.profilePicture.url}
              alt={studentInfo.name}
              onError={(e) => (e.target.style.display = "none")}
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/40"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold text-lg">
              {studentInfo?.name?.charAt(0)?.toUpperCase() || "S"}
            </div>
          )}
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-[#0b0e1a] rounded-full" />
        </div>

        <div>
          <h2 className="font-semibold text-lg">{studentInfo?.name || "Student"}</h2>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      {/* 💬 MESSAGE AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-28 space-y-5 chat-scroll
                ">
                    {loading ? (
          <p className="text-center text-gray-400 animate-pulse">Loading chat...</p>
        ) : allMessages.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">No messages yet. Start a conversation 👋</p>
        ) : (
          allMessages.map((msg, i) => {
            const isMentor = msg.senderId === mentorId;
            const time =
              msg.createdAt && !isNaN(new Date(msg.createdAt))
                ? new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "";

            return (
              <div
                key={msg._id || i}
                className={`flex items-end gap-3 ${isMentor ? "justify-end" : "justify-start"}`}
              >
                {!isMentor && (
                  studentInfo?.profilePicture?.url ? (
                    <img
                      src={studentInfo.profilePicture.url}
                      alt="avatar"
                      className="w-8 h-8 rounded-full object-cover border border-blue-500/20"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
                      {studentInfo?.name?.charAt(0)?.toUpperCase() || "S"}
                    </div>
                  )
                )}

                <div
                  className={`relative px-4 py-3 max-w-[72%] rounded-2xl shadow-md ${
                    isMentor
                      ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-br-md"
                      : "bg-[#171a2a] text-gray-100 rounded-bl-md border border-blue-500/10"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <span className="block text-[10px] text-gray-300 text-right mt-1">{time}</span>
                </div>
              </div>
            );
          })
        )}
        <div ref={scrollRef} />
      </div>

      {/* ✍️ FIXED INPUT BAR */}
      <div className="sticky bottom-0 w-full bg-[#0a0c16]/95 border-t border-blue-500/20 backdrop-blur-xl px-6 py-4 z-10">
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-5 py-3 rounded-full bg-[#121528] text-white border border-blue-500/20 outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />

          <button
            onClick={handleSend}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 font-semibold shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
);

}
