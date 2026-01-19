"use client";
import React, { useState } from "react";
import axios from "axios";

function Page() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    profession: "",
    experience: "",
    skillLevel: "",
    githubUrl: "",
    linkedinUrl: "",
  });

  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);

  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseData(null);

    try {
      const response = await axios.post(`${baseURL}/user/mentor/signup`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("✅ Response:", response.data);
      setResponseData(response.data);
    } catch (error) {
      console.error("❌ Error:", error.response ? error.response.data : error.message);
      setResponseData(error.response?.data || { message: "Request failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-4">
      <h1 className="text-3xl font-semibold mb-6">Mentor Signup</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-black/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-blue-500/30"
      >
        {/* Email */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Email</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Password */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Password</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Name */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Full Name</span>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Profession */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Profession</span>
          <input
            type="text"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Experience */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Experience (Years)</span>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Skill Level */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">Skill Level</span>
          <select
            name="skillLevel"
            value={formData.skillLevel}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Skill Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </label>

        {/* GitHub */}
        <label className="block mb-3">
          <span className="text-sm text-gray-300">GitHub URL</span>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* LinkedIn */}
        <label className="block mb-5">
          <span className="text-sm text-gray-300">LinkedIn URL</span>
          <input
            type="url"
            name="linkedinUrl"
            value={formData.linkedinUrl}
            onChange={handleChange}
            className="w-full px-3 py-2 mt-1 rounded-lg bg-transparent border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>

      {responseData && (
        <div className="mt-6 w-full max-w-md bg-black/50 border border-blue-400/40 p-4 rounded-lg text-sm">
          <h2 className="font-semibold text-blue-300 mb-2">Response:</h2>
          <pre className="whitespace-pre-wrap break-words">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default Page;
