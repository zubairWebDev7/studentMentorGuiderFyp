"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, LogOut, User, MessageCircle, Brain, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function StudentNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/student/logout`,
        {},
        { withCredentials: true }
      );
      router.push("/student/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full py-6 px-6 md:px-10 lg:px-20 justify-between z-[100]">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between">
        {/* Left Section (Logo) */}
        <Link href="/student/dashboard">
          <motion.div
            className="flex items-center justify-center gap-2 cursor-pointer"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.img src={"/assets/logo.svg"} className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Student-Mentor
            </h1>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden lg:flex items-center gap-[48px] px-[48px] py-[16px] rounded-[65px] border-gradient-blue bg-[#0a0a0a]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <NavItem href="/student/profile" icon={<User size={18} />} label="Profile" />
          <NavItem href="/student/chats" icon={<MessageCircle size={18} />} label="Chats" />
          <NavItem href="/student/ask-ai" icon={<Brain size={18} />} label="AskFromAI" />
          <NavItem href="/student/mentors" icon={<Users size={18} />} label="Mentors" />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 text-lg transition-all"
          >
            <LogOut size={18} /> Logout
          </motion.button>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          type="button"
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden mt-4 p-6 bg-[#0a0a0a] border-gradient-blue rounded-2xl"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col gap-4 text-white">
              <MobileNavItem href="/student/profile" label="Profile" />
              <MobileNavItem href="/student/chats" label="Chats" />
              <MobileNavItem href="/student/ask-ai" label="AskFromAI" />
              <MobileNavItem href="/student/mentors" label="Mentors" />

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="mt-3 text-red-400 text-left"
              >
                Logout
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* 🔹 Reusable Desktop Nav Item */
const NavItem = ({ href, icon, label }) => (
  <motion.div whileHover={{ scale: 1.05 }}>
    <Link
      href={href}
      className="flex items-center gap-2 text-white text-lg leading-none hover:text-blue-400 transition-colors"
    >
      {icon} {label}
    </Link>
  </motion.div>
);

/* 🔹 Reusable Mobile Nav Item */
const MobileNavItem = ({ href, label }) => (
  <Link
    href={href}
    className="text-white/80 text-base hover:text-blue-400 transition-colors"
  >
    {label}
  </Link>
);
