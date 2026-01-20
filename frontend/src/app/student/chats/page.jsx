"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
    <div className="flex justify-center min-h-screen bg-gradient-to-br from-[#050507] via-[#0b1020] to-[#040404] text-white">
      <div className="flex flex-col w-full md:w-2/3 lg:w-[42%] bg-[#0d0f18]/95 backdrop-blur-xl rounded-3xl shadow-[0_0_45px_rgba(0,0,0,0.85)] border border-blue-500/15 overflow-hidden h-[90vh]">

        {/* HEADER */}
        <div className="px-6 py-4 bg-[#0b0e1a]/90 border-b border-blue-500/20 sticky top-0 z-20">
          <h1 className="text-xl font-semibold">My Chats</h1>
        </div>

        {/* CHAT LIST */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 chat-scroll">
          {loading ? (
            <p className="text-center text-gray-400 animate-pulse">Loading chats...</p>
          ) : chats.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">No chats available</p>
          ) : (
            chats.map((chat, index) => (
              <div
                key={index}
                onClick={() => openChat(chat.mentor.id)}
                className="flex items-center gap-4 p-4 rounded-2xl cursor-pointer bg-[#121528]/80 hover:bg-[#1a1f38] transition-all border border-blue-500/10 hover:border-blue-500/30"
              >
                {/* Avatar */}
                {chat.mentor.profilePicture ? (
                  <img
                    src={chat.mentor.profilePicture}
                    alt={chat.mentor.name}
                    className="w-12 h-12 rounded-full object-cover border border-blue-500/30"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center font-bold">
                    {chat.mentor.name?.charAt(0)?.toUpperCase() || "M"}
                  </div>
                )}

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h2 className="font-medium truncate">{chat.mentor.name}</h2>
                  <p className="text-sm text-gray-400 truncate">
                    {chat.latestMessage ? chat.latestMessage.text : "No messages yet"}
                  </p>
                </div>

                {/* Time */}
                {chat.latestMessage?.createdAt && (
                  <span className="text-xs text-gray-500 whitespace-nowrap">
                    {new Date(chat.latestMessage.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;