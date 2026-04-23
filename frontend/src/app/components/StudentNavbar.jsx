"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LogOut,
  User,
  MessageCircle,
  Brain,
  Users,
  BookOpen,
  Menu,
  X,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";

const NAV_LINKS = [
  { href: "/student/profile", icon: User, label: "Profile" },
  { href: "/student/chats", icon: MessageCircle, label: "Chats" },
  { href: "/student/ai-suggestion", icon: Brain, label: "AskFromAI" },
  { href: "/student/mentors", icon: Users, label: "Mentors" },
  { href: "/student/courses", icon: BookOpen, label: "Courses" },
];

export default function StudentNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Subtle shadow/background change on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      <nav
        className={`sticky top-0 w-full z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-[#0a0a0a]/90 backdrop-blur-md shadow-lg shadow-blue-900/10"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between py-4 md:py-5 px-5 md:px-10 lg:px-20">
          {/* Logo */}
          <Link href="/student/dashboard" className="flex-shrink-0">
            <motion.div
              className="flex items-center gap-2 cursor-pointer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <img src="/assets/logo.svg" className="w-7 h-7 md:w-8 md:h-8" alt="logo" />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight whitespace-nowrap">
                Student<span className="text-blue-400">-</span>Mentor
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden lg:flex items-center gap-6 xl:gap-8 px-6 xl:px-8 py-3 rounded-full border-gradient-blue bg-[#0a0a0a]/80 backdrop-blur-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {NAV_LINKS.map((link) => (
              <NavItem
                key={link.href}
                href={link.href}
                icon={<link.icon size={18} />}
                label={link.label}
                active={pathname === link.href}
              />
            ))}

            <div className="w-px h-6 bg-gradient-to-b from-transparent via-blue-500/40 to-transparent" />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 text-base transition-colors"
            >
              <LogOut size={18} /> Logout
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="lg:hidden relative z-[110] p-2 rounded-xl border-gradient-blue bg-[#0a0a0a]/80 backdrop-blur-sm text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu size={22} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu — full-screen overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in panel */}
            <motion.div
              className="lg:hidden fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[#0a0a0a] border-l border-blue-500/20 z-[95] overflow-y-auto"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex flex-col h-full p-6 pt-24">
                <div className="flex flex-col gap-2 flex-grow">
                  {NAV_LINKS.map((link, idx) => (
                    <MobileNavItem
                      key={link.href}
                      href={link.href}
                      icon={<link.icon size={20} />}
                      label={link.label}
                      active={pathname === link.href}
                      index={idx}
                    />
                  ))}
                </div>

                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: NAV_LINKS.length * 0.05 + 0.1 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleLogout}
                  className="mt-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut size={20} />
                  <span className="font-medium">Logout</span>
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-6">
                  Student-Mentor © 2026
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* 🔹 Desktop Nav Item with active state */
const NavItem = ({ href, icon, label, active }) => (
  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
    <Link
      href={href}
      className={`relative flex items-center gap-2 text-base leading-none transition-colors ${
        active ? "text-blue-400" : "text-white hover:text-blue-400"
      }`}
    >
      {icon} {label}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      )}
    </Link>
  </motion.div>
);

/* 🔹 Mobile Nav Item with active state + stagger animation */
const MobileNavItem = ({ href, icon, label, active, index }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
  >
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active
          ? "bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-400/40 text-blue-300"
          : "text-white/80 hover:bg-white/5 border border-transparent"
      }`}
    >
      <span className={active ? "text-blue-400" : "text-gray-400"}>{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  </motion.div>
);