"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, Type, AlignLeft, DollarSign, Timer, Tag, Plus,
  AlertCircle, CheckCircle, Trash2, GripVertical, ImageIcon, ListOrdered,
} from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3006";

const emptySyllabusItem = () => ({ title: "", description: "", durationMinutes: 0 });

export default function CreateCoursePage() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [durationHours, setDurationHours] = useState(0);
  const [tags, setTags] = useState("");
  const [syllabus, setSyllabus] = useState([emptySyllabusItem()]);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const addSyllabusItem = () => setSyllabus((prev) => [...prev, emptySyllabusItem()]);
  const removeSyllabusItem = (idx) => setSyllabus((prev) => prev.filter((_, i) => i !== idx));
  const updateSyllabus = (idx, field, value) =>
    setSyllabus((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!title.trim() || !description.trim()) {
      setMessage({ type: "error", text: "Title and description are required." });
      return;
    }

    const validSyllabus = syllabus.filter((s) => s.title.trim());

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("subtitle", subtitle.trim() || "");
      formData.append("description", description);
      formData.append("price", String(Number(price) || 0));
      formData.append("durationHours", String(Number(durationHours) || 0));
      formData.append("tags", JSON.stringify(
        tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : []
      ));
      formData.append("syllabus", JSON.stringify(validSyllabus));
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const res = await axios.post(`${API_BASE}/user/mentor/create`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage({ type: "success", text: res.data.message || "Course created successfully!" });
      setTitle(""); setSubtitle(""); setDescription("");
      setPrice(0); setDurationHours(0); setTags("");
      setSyllabus([emptySyllabusItem()]);
      setThumbnail(null); setThumbnailPreview(null);
    } catch (err) {
      setMessage({ type: "error", text: err?.response?.data?.message || err.message || "Create failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full px-6 py-16">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-12 text-center">
          <div className="p-4 rounded-full bg-gradient-to-tr from-blue-800 to-blue-400 text-white shadow-md w-fit">
            <Plus size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gradient-white">
            Create Course
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-1 bg-blue-400 rounded-full"
          />
          <p className="text-gradient-white text-sm mt-1">
            Fill in the details below to publish your new course
          </p>
        </div>

        {/* Message */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-center gap-3 p-4 rounded-2xl text-sm font-medium mb-8 ${
              message.type === "error"
                ? "bg-red-600/20 text-red-300 border border-red-500/40"
                : "bg-green-600/20 text-green-300 border border-green-500/40"
            }`}
          >
            {message.type === "error" ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            {message.text}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="rounded-3xl backdrop-blur-sm bg-[#0c0c0c]/70 border border-gradient-blue shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ── Basic Info ── */}
            <SectionLabel icon={<Type size={14} />}>Basic Info</SectionLabel>

            <IconInput
              icon={<Type size={16} />}
              label="Title"
              req
              placeholder="e.g. Complete React Developer Bootcamp"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <IconInput
              icon={<BookOpen size={16} />}
              label="Subtitle"
              placeholder="A short tagline for your course"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />

            <label className="block">
              <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                <span className="text-blue-400"><AlignLeft size={16} /></span>
                Description <span className="text-red-400 text-xs">*</span>
              </span>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
                placeholder="Describe what students will learn, prerequisites, and course structure..."
                className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
              />
            </label>

            {/* ── Pricing & Duration ── */}
            <div className="h-px bg-white/10" />
            <SectionLabel icon={<DollarSign size={14} />}>Pricing & Duration</SectionLabel>

            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                  <span className="text-blue-400"><DollarSign size={16} /></span>
                  Price (USD)
                </span>
                <input
                  type="number" min={0} value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </label>
              <label className="block">
                <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
                  <span className="text-blue-400"><Timer size={16} /></span>
                  Duration (hrs)
                </span>
                <input
                  type="number" min={0} value={durationHours}
                  onChange={(e) => setDurationHours(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                />
              </label>
            </div>

            {/* ── Tags ── */}
            <div className="h-px bg-white/10" />
            <SectionLabel icon={<Tag size={14} />}>Tags</SectionLabel>

            <IconInput
              icon={<Tag size={16} />}
              label="Tags (comma-separated)"
              placeholder="e.g. React, JavaScript, Frontend"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
            {tags && (
              <div className="flex flex-wrap gap-2 -mt-2">
                {tags.split(",").map((t) => t.trim()).filter(Boolean).map((tag, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* ── Thumbnail ── */}
            <div className="h-px bg-white/10" />
            <SectionLabel icon={<ImageIcon size={14} />}>Thumbnail</SectionLabel>

            <label className="block cursor-pointer">
              <span className="text-sm text-gray-300 flex items-center gap-2 mb-2">
                <span className="text-blue-400"><ImageIcon size={16} /></span>
                Course Thumbnail
              </span>
              <div className="relative group">
                {thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="w-full h-44 object-cover rounded-2xl border border-white/10"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all rounded-2xl flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Click to change</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-36 rounded-2xl border-2 border-dashed border-white/20 hover:border-blue-500/50 transition-all flex flex-col items-center justify-center gap-2 bg-white/5">
                    <ImageIcon size={28} className="text-gray-500" />
                    <span className="text-gray-500 text-sm">Click to upload thumbnail</span>
                    <span className="text-gray-600 text-xs">PNG, JPG, WEBP recommended</span>
                  </div>
                )}
                <input type="file" accept="image/*" onChange={handleThumbnail} className="hidden" />
              </div>
            </label>

            {/* ── Syllabus ── */}
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <SectionLabel icon={<ListOrdered size={14} />}>Syllabus</SectionLabel>
              <button
                type="button"
                onClick={addSyllabusItem}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-all text-xs font-medium"
              >
                <Plus size={13} /> Add Item
              </button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {syllabus.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3"
                  >
                    <div className="flex items-center gap-3">
                      <GripVertical size={16} className="text-gray-600 shrink-0" />
                      <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">
                        Section {idx + 1}
                      </span>
                      {syllabus.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeSyllabusItem(idx)}
                          className="ml-auto text-red-400 hover:text-red-300 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>

                    <input
                      placeholder="Section title *"
                      value={item.title}
                      onChange={(e) => updateSyllabus(idx, "title", e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                    />

                    <textarea
                      placeholder="Description (optional)"
                      value={item.description}
                      onChange={(e) => updateSyllabus(idx, "description", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm resize-none"
                    />

                    <div className="flex items-center gap-2">
                      <Timer size={14} className="text-blue-400 shrink-0" />
                      <input
                        type="number"
                        min={0}
                        placeholder="0"
                        value={item.durationMinutes}
                        onChange={(e) => updateSyllabus(idx, "durationMinutes", e.target.value)}
                        className="w-32 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
                      />
                      <span className="text-gray-500 text-xs">minutes</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button
                type="button"
                onClick={addSyllabusItem}
                className="w-full py-2.5 rounded-2xl border border-dashed border-white/20 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-gray-500 hover:text-blue-400 text-sm flex items-center justify-center gap-2"
              >
                <Plus size={15} />
                Add another section
              </button>
            </div>

            {/* Submit */}
            <div className="h-px bg-white/10" />
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(59,130,246,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 transition-all font-semibold text-white text-base disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Create Course
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

// ── Section Label ──
const SectionLabel = ({ icon, children }) => (
  <div className="flex items-center gap-2">
    <span className="text-blue-400">{icon}</span>
    <span className="text-blue-400 text-xs font-semibold uppercase tracking-widest">{children}</span>
  </div>
);

// ── Icon Input ──
const IconInput = ({ icon, label, placeholder, req = false, ...props }) => (
  <label className="block">
    <span className="text-sm text-gray-300 flex items-center gap-2 mb-1">
      <span className="text-blue-400">{icon}</span>
      {label}
      {req && <span className="text-red-400 text-xs">*</span>}
    </span>
    <input
      placeholder={placeholder}
      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm"
      {...props}
    />
  </label>
);