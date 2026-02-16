"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Github, Linkedin, Twitter, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Security", href: "#" },
      { name: "Roadmap", href: "#" },
    ],
    Community: [
      { name: "Blog", href: "#" },
      { name: "Forum", href: "#" },
      { name: "Resources", href: "#" },
      { name: "Events", href: "#" },
    ],
    Company: [
      { name: "About", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
    ],
    Legal: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
      { name: "GDPR", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Github, href: "#", label: "Github" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className=" text-white border-t border-gradient-blue mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12"
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">SM</span>
              </div>
              <h3 className="text-2xl font-bold text-gradient-white">
                Student-Mentor
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Connect with verified mentors, learn from industry experts, and accelerate your career growth with AI-powered personalized learning.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  className="p-3 rounded-full bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 hover:border-blue-400 transition-all group"
                  title={social.label}
                >
                  <social.icon size={18} className="text-blue-400 group-hover:text-blue-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links], idx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + idx * 0.1 }}
            >
              <h4 className="font-semibold text-gradient-white mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 shadow-lg">
              <Mail size={20} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Email</p>
              <a href="mailto:support@studentmentor.com" className="text-gradient-white hover:text-blue-400 transition-colors text-sm">
                support@studentmentor.com
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-tr from-purple-800 to-purple-400 shadow-lg">
              <Phone size={20} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Phone</p>
              <a href="tel:+1234567890" className="text-gradient-white hover:text-purple-400 transition-colors text-sm">
                +1 (234) 567-890
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-tr from-green-800 to-green-400 shadow-lg">
              <MapPin size={20} className="text-white" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <p className="text-gradient-white text-sm">San Francisco, CA</p>
            </div>
          </div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 p-8 rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue hover:shadow-2xl hover:shadow-blue-500/20 transition-all"
        >
          <h3 className="text-2xl font-bold mb-2 text-gradient-white">Stay Updated</h3>
          <p className="text-gray-300 mb-6">
            Subscribe to our newsletter for the latest mentoring tips, course launches, and industry insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-2xl bg-[#0c0c0c]/70 border border-blue-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-2xl border-gradient-blue hover:bg-blue-400/20 transition-all font-semibold text-gradient-white"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-blue-500/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} Student-Mentor Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-blue-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              Cookie Settings
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}