"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function MentorChatListPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`${baseURL}/user/mentor/previouseChat/list`, {
          withCredentials: true,
        });
        

        console.log("Fetched students:", res.data);
        setStudents(res.data?.students || []);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [baseURL]);

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex flex-col items-center p-5">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-[#111] rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600/20 border-b border-blue-500/30 text-center py-3 font-semibold text-lg">
          💬 Chats with Students
        </div>

        {/* Body */}
        {loading ? (
          <div className="p-6 text-center text-gray-400">Loading students...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">{error}</div>
        ) : students.length === 0 ? (
          <div className="p-6 text-center text-gray-400">No chats yet.</div>
        ) : (
          <div className="divide-y divide-blue-500/10">
            {students.map((student) => (
              <div
                key={student._id || Math.random()}
                className="flex items-center justify-between p-4 hover:bg-blue-500/10 cursor-pointer transition-all"
                onClick={() => router.push(`/mentor/chat/${student._id}`)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={
                      student.profilePicture?.url ||
                      "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"
                    }
                    alt={student.name || "Student"}
                    className="w-10 h-10 rounded-full object-cover border border-blue-500/30"
                  />
                  <div className="flex flex-col">
                    <p className="font-medium">{student.name || "Student"}</p>
                    <p className="text-sm text-gray-400">{student.email || ""}</p>
                  </div>
                </div>

                {/* Optional: last message preview */}
                {student.lastMessage && (
                  <span className="text-gray-400 text-sm truncate max-w-[120px]">
                    {student.lastMessage}
                  </span>
                )}

                <span className="text-blue-400 text-sm ml-2">→</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
