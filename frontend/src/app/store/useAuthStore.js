"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const useAuthStore = create(
  persist(
    (set) => ({
      loading: false,
      responseData: null,
      error: null,
      mentor: null,

      login: async (formData, router) => {
        set({ loading: true, responseData: null, error: null });

        try {
          const response = await axios.post(`${baseURL}/user/mentor/login`, formData, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          console.log("✅ Login Response:", response.data);

          if (response.data.mentor) {
            console.log("Mentor before setting:", response.data.mentor);
            set({ mentor: response.data.mentor });
          }

          set({ responseData: response.data });
          router.push("/mentor/profile");
        } catch (error) {
          console.error("❌ Error:", error.response ? error.response.data : error.message);
          set({
            error: error.response?.data || { message: "Login failed" },
            responseData: null,
          });
        } finally {
          set({ loading: false });
        }
      },

      logout: () => set({ mentor: null }),
    }),
    {
      name: "auth-storage", // saved key in localStorage
      partialize: (state) => ({ mentor: state.mentor }), // only persist mentor
    }
  )
);
