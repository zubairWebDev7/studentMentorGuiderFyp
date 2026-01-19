"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useStudentAuth } from "../../store/studentAuth";

export default function StudentLoginPage() {
  const router = useRouter();
  const { loginStudent, loading } = useStudentAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("call he login student");
    
    const response = await loginStudent(formData, router);

    if (response?.message) {
      setMessage(response.message);
    } else if (response?.error) {
      setMessage(response.error.message || "Login failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-blue-500/30">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-400">
          🎓 Student Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-semibold disabled:opacity-60"
          >
            {loading ? <Loader /> : "Login"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-6 p-3 text-center rounded-lg text-sm font-medium ${
              message.includes("success")
                ? "bg-green-600/30 text-green-300 border border-green-500/50"
                : "bg-red-600/30 text-red-300 border border-red-500/50"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

// ✅ Input Component
const Input = ({ label, type = "text", ...props }) => (
  <label className="block">
    <span className="text-sm text-gray-300">{label}</span>
    <input
      type={type}
      {...props}
      required
      className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </label>
);

// ✅ Simple Loader
const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    <span className="ml-2">Logging in...</span>
  </div>
);
