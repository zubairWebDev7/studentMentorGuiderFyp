"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import StudentNavbar from "../../components/StudentNavbar";

const Page = () => {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/user/student/studentchat",
          { withCredentials: true }
        );
        setChats(response.data.chats || []);
      } catch (error) {
        console.error("Error fetching chats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const openChat = (mentorId) => {
    router.push(`/student/chat/${mentorId}`);
  };

  return (
    <div className="min-h-screen text-white">
      {/* NAVBAR */}
      <StudentNavbar />

      {/* PAGE CONTENT */}
      <div className="flex justify-center px-4 py-8">
        <div className="w-full md:w-3/4 lg:w-[45%] h-[85vh] rounded-3xl 
          bg-[#0b0e1a]/70 backdrop-blur-xl 
          border border-blue-500/20 
          shadow-[0_0_40px_rgba(59,130,246,0.08)]
          flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="px-6 py-5 border-b border-blue-500/20 sticky top-0 z-20 bg-[#0b0e1a]/90">
            <h1 className="text-lg font-semibold tracking-wide">
              Mentor Conversations
            </h1>
            <p className="text-sm text-gray-400">
              Continue your guidance sessions
            </p>
          </div>

          {/* CHAT LIST */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-4 chat-scroll">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 animate-pulse">
                <span className="text-sm">Loading your chats…</span>
              </div>
            ) : chats.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <h3 className="text-lg font-medium text-gray-300">
                  No chats yet
                </h3>
                <p className="text-sm text-gray-400 mt-2 max-w-xs">
                  Once you connect with a mentor, your conversations will appear here.
                </p>
              </div>
            ) : (
              chats.map((chat, index) => (
                <div
                  key={index}
                  onClick={() => openChat(chat.mentor.id)}
                  className="group flex items-center gap-4 p-4 rounded-2xl cursor-pointer
                    bg-[#121528]/80 hover:bg-[#1a1f38]/90
                    border border-blue-500/10 hover:border-blue-500/40
                    transition-all duration-300 hover:scale-[1.01]"
                >
                  {/* Avatar */}
                  {chat.mentor.profilePicture ? (
                    <img
                      src={chat.mentor.profilePicture}
                      alt={chat.mentor.name}
                      className="w-12 h-12 rounded-full object-cover border border-blue-500/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full 
                      bg-gradient-to-br from-blue-600 to-blue-400 
                      flex items-center justify-center font-semibold shadow-md">
                      {chat.mentor.name?.charAt(0)?.toUpperCase() || "M"}
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-medium truncate group-hover:text-blue-400 transition">
                      {chat.mentor.name}
                    </h2>
                    <p className="text-sm text-gray-400 truncate">
                      {chat.latestMessage
                        ? chat.latestMessage.text
                        : "Start the conversation"}
                    </p>
                  </div>

                  {/* Time */}
                  {chat.latestMessage?.createdAt && (
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(chat.latestMessage.createdAt).toLocaleTimeString(
                        [],
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
