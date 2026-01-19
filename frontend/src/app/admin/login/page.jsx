"use client";
import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/admin/login",
        { email, password },
        { withCredentials: true }
      );
      setSuccessMsg("Login successful ✅ Redirecting...");
      console.log(response.data);
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    } catch (error) {
      setErrorMsg(
        error.response?.data?.message || "Invalid email or password ❌"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-black flex items-center justify-center px-4">
      <div className="bg-[#0b132b]/60 border border-blue-800/30 shadow-2xl backdrop-blur-lg rounded-2xl p-10 w-full max-w-md transition-all hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Admin Login
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Secure access to your control panel
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-blue-300 font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-3 bg-[#1b1f3b] border border-blue-700/30 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-blue-300 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-[#1b1f3b] border border-blue-700/30 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 outline-none"
            />
          </div>

          {errorMsg && (
            <p className="text-red-400 text-sm text-center">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-green-400 text-sm text-center">{successMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-gray-400 text-sm">
          <p>© 2025 Mentor AI Admin Panel</p>
        </div>
      </div>
    </div>
  );
}
