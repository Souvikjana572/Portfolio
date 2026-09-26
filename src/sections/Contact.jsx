import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticleBackground from "../components/Particlesbackground";
import Astra from "../assets/Astra.png";
import { FaPaperPlane, FaCopy, FaCheck, FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import { playUiSound } from "../utils/sound";

const SERVICE_ID = import.meta.env.VITE_SERVICE_ID || "service_souvik";
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID || "template_xtbbifm";
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY || "MxdypWlYRQaV1hlJj";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);

  const emailAddress = "souvikj572@gmail.com";

  const handleCopyEmail = () => {
    playUiSound("click");
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "message"];
    const newErrors = {};
    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "This field is required")
    );
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    playUiSound("button");

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("config_error");
      return;
    }

    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      playUiSound("toggle");
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-[#05070f] overflow-hidden text-white py-24 px-5 sm:px-8 md:px-16 flex items-center justify-center"
    >
      <ParticleBackground />

      {/* Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-25 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px]"
          animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px]"
          animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: Astra Mascot & Direct Reach Out info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Floating Mascot */}
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500 to-purple-600 blur-2xl opacity-30 animate-pulse" />
            <motion.img
              src={Astra}
              alt="Astra Astronaut Mascot"
              className="relative w-56 sm:w-72 lg:w-80 rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] object-contain"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-2">
            Let&apos;s Connect
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Have a project or{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
              opportunity?
            </span>
          </h2>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you&apos;re looking to collaborate, hire for software engineering roles, or discuss system design, my inbox is always open.
          </p>

          {/* Quick Copy Email Box */}
          <div className="mt-6 p-3 rounded-2xl bg-slate-900/80 border border-white/10 backdrop-blur-xl flex items-center justify-between gap-3 w-full max-w-md">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <FaEnvelope className="text-sm" />
              </div>
              <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                {emailAddress}
              </span>
            </div>
            <button
              onClick={handleCopyEmail}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors flex items-center gap-1.5 shrink-0"
              title="Copy to clipboard"
            >
              {copied ? (
                <>
                  <FaCheck className="text-emerald-400 text-xs" />
                  <span className="text-emerald-300">Copied!</span>
                </>
              ) : (
                <>
                  <FaCopy className="text-xs" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Right Column: Interactive Glassmorphic Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
        >
          {/* Subtle top edge neon accent */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

          <h3 className="text-2xl font-bold text-white mb-2">
            Send a Message
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            Fill in your details below and I&apos;ll get back to you as soon as possible.
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="mb-1.5 text-xs font-mono font-medium text-slate-300">
                  YOUR NAME <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Alex Smith"
                  value={formData.name}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-xl bg-slate-950/60 border ${
                    errors.name ? "border-rose-500" : "border-white/10 focus:border-cyan-400/60"
                  } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all`}
                />
                {errors.name && (
                  <p className="text-rose-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="mb-1.5 text-xs font-mono font-medium text-slate-300">
                  EMAIL OR CONTACT <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={`px-4 py-3 rounded-xl bg-slate-950/60 border ${
                    errors.email ? "border-rose-500" : "border-white/10 focus:border-cyan-400/60"
                  } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all`}
                />
                {errors.email && (
                  <p className="text-rose-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1.5 text-xs font-mono font-medium text-slate-300">
                MESSAGE <span className="text-rose-400">*</span>
              </label>
              <textarea
                name="message"
                rows={4}
                placeholder="Hi Souvik, I saw your portfolio and would love to connect about..."
                value={formData.message}
                onChange={handleChange}
                className={`px-4 py-3 rounded-xl bg-slate-950/60 border ${
                  errors.message ? "border-rose-500" : "border-white/10 focus:border-cyan-400/60"
                } text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400/50 transition-all resize-none`}
              />
              {errors.message && (
                <p className="text-rose-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Status alerts */}
            {status && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl text-xs font-medium ${
                  status === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    : status === "error" || status === "config_error"
                    ? "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                    : "bg-cyan-500/10 border border-cyan-500/30 text-cyan-300"
                }`}
              >
                {status === "sending"
                  ? "Transmitting message..."
                  : status === "success"
                  ? "✓ Message delivered successfully! Thank you for reaching out."
                  : status === "config_error"
                  ? "Email service configuration pending."
                  : "Unable to transmit message right now. Please email directly."}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              type="submit"
              className="mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-60 text-white py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm shadow-xl shadow-blue-600/25 transition-all cursor-pointer"
              data-cursor-text="Send"
            >
              <FaPaperPlane className="text-xs" />
              <span>{status === "sending" ? "Transmitting..." : "Send Message"}</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
