"use client";
import { create } from "zustand";
import axios from "axios";
import { useChatStore } from "./chatStore";

import { jwtDecode } from "jwt-decode";


const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export const useStudentAuth = create((set) => ({
  loading: false,
  role:null,
  responseData: null,
  error: null,
  mentors: [],

  // 🟢 SIGNUP STUDENT
  signupStudent: async (formData, router) => {
    set({ loading: true, responseData: null, error: null });
    try {
      const response = await axios.post(`${baseURL}/user/student/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("✅ Student Signup:", response.data);
      set({ responseData: response.data, loading: false });
      router.push("/student/login");
    } catch (error) {
      console.error("❌ Signup Error:", error.response?.data || error.message);
      set({ error: error.response?.data || { message: "Signup failed" }, loading: false });
    }
  },

  // 🟢 LOGIN STUDENT
loginStudent: async (formData, router) => {
  set({ loading: true, responseData: null, error: null });

  try {
    const response = await axios.post(`${baseURL}/user/student/login`, formData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // important for cookies
    });
    const { connectSocket } = useChatStore.getState();

    console.log("✅ Login Successful:", response.data);
    set({ responseData: response.data, loading: false, role:response.data.role });
    console.log("role",response.data.role);
    
    
    // 🧩 Extract token and decode student ID
    const token = response.data.accessToken;
    console.log("token from cookies", token);
    
    if (token) {
      const decoded = jwtDecode(token);
      const studentId = decoded.id; // assuming backend signs { id, role, ... }
      console.log("🧠 Decoded Student ID:", studentId);

      // Save for future use
      localStorage.setItem("studentId", studentId);

      // Connect socket immediately
      connectSocket(studentId);
    }

    router.push("/student/dashboard");
    return response.data;
  } catch (error) {
    console.error("❌ Login Error:", error.response?.data || error.message);
    const errData = error.response?.data || { message: "Login failed" };
    set({ error: errData, loading: false });
    return { error: errData };
  }
},

  // 🟢 FETCH ALL VERIFIED MENTORS
  fetchAllMentors: async () => {
    set({ loading: true, mentors: [], error: null });
    try {
      const res = await axios.get(`${baseURL}/user/student/all-mentor`, {
        withCredentials: true,
      });
      console.log("✅ Mentors Fetched:", res.data);
      set({ mentors: res.data.mentors || [], loading: false });
    } catch (error) {
      console.error("❌ Fetch Mentors Error:", error.response?.data || error.message);
      set({
        error: error.response?.data || { message: "Failed to fetch mentors" },
        loading: false,
      });
    }
  },
}));
