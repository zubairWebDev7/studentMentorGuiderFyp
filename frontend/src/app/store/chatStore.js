"use client";
import { create } from "zustand";
import { io } from "socket.io-client";
import { useStudentAuth } from "./studentAuth";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

 


export const useChatStore = create((set, get) => ({
  socket: null,
  messages: [],
  currentChat: null,
  onlineUsers: new Map(),

  // 🔌 Initialize socket connection
  connectSocket: (userId) => {
    // prevent duplicate sockets
    if (get().socket) return;

    const socket = io(baseURL, {
      withCredentials: true, // important for cookies/session auth
      transports: ["websocket", "polling"], // fallback support
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // ✅ Connection established
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
      socket.emit("join", userId);
    });

    // 🧠 Connection lost
    socket.on("disconnect", (reason) => {
      console.warn("🔴 Socket disconnected:", reason);
      set({ socket: null });
    });

    // 🔁 Reconnect
    socket.on("reconnect_attempt", () => {
      console.log("♻️ Trying to reconnect...");
    });

    // 📨 Receive message
    socket.on("receive_message", (message) => {
  console.log("📩 Received:", message);

  // 1️⃣ Update messages in store
  set((state) => ({ messages: [...state.messages, message] }));

  // 2️⃣ Show browser notification if sender is not current user
  if (message.senderId !== useStudentAuth.getState().id) {
    const senderName = message.senderRole === "mentor" ? "Mentor" : "Student";
    
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification(`${senderName} sent a message`, {
        body: message.text,
        icon: "/chat-icon.png", // optional: show your app icon
        tag: message.conversationId, // avoid duplicate notifications for same chat
      });

      // 3️⃣ When notification clicked → navigate to chat
      notification.onclick = () => {
        window.focus(); // bring browser to front
        // navigate to chat page
        window.location.href = `/chat/${message.senderId}`; // or your route
      };
    }
  }
});


    // 💬 Conversation started
    socket.on("conversation_started", (conversation) => {
      console.log("💬 Conversation started:", conversation);
      set({ currentChat: conversation });
    });

    // ⚠️ Server error messages
    socket.on("error_message", (msg) => {
      console.error("❌ Socket Error:", msg);
    });

    // 🧹 Save the socket instance
    set({ socket });
  },

  // 🧠 Start a conversation
  startConversation: (senderId, receiverId) => {
    const { socket } = get();
    if (!socket) return console.error("❌ Socket not connected");
    socket.emit("start_conversation", { senderId, receiverId });
  },

  // ✉️ Send a message
   sendMessage: (senderId, receiverId, text) => {
    const { socket, messages } = get();
    if (!socket) return console.error("❌ Socket not connected");
    
    // ✅ Get role from the auth store
    const { role } = useStudentAuth.getState();
    console.log("Role in chat store:", role);

    // Add role to message payload if needed
    if(!senderId, receiverId, text, role) {
      console.log("Missing fields")
    }
    const message = { senderId, receiverId, text, senderRole: 'student' };

    socket.emit("send_message", message);

    // Optimistic UI update
    set({ messages: [...messages, message] });
  },


  // 🧹 Disconnect manually (optional)
  disconnectSocket: () => {
    const socket = get().socket;
    if (socket) {
      socket.disconnect();
      console.log("🔌 Socket disconnected manually");
      set({ socket: null });
    }
  },
}));
