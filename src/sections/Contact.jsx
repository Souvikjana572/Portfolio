// Importing React's useState hook for managing component state
import { useState } from "react";

// Importing motion component from Framer Motion for animations
import { motion } from "framer-motion";

// Importing EmailJS SDK
import emailjs from "@emailjs/browser";

// Importing Particles Background (same as Home component)
import ParticleBackground from "../components/Particlesbackground";

// Importing the contact image asset
import Astra from "../assets/Astra.png";

// Reading EmailJS credentials from environment variables (Vite)
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const required = ["name", "email", "message"];
    const newErrors = {};
    required.forEach(
      (f) => !formData[f].trim() && (newErrors[f] = "Fill this field")
    );
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact" className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 40, 0], x: [0, 20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -40, 0], x: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      {/* Particles Background */}
      <ParticleBackground />

      {/* Contact Section Content */}
      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        {/* Left Animated Image Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden md:flex w-full md:w-1/2 justify-center"
        >
          <motion.img
            src={Astra}
            alt="Contact"
            className="w-72 md:w-140 rounded-2xl shadow-lg object-cover"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Right Side Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300"
        >
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">Let's Get in Touch</h2>
          <p className="text-gray-400 text-sm mb-6">
            Or reach me directly:{" "}
            <a
              href="mailto:souvikj572@gmail.com"
              className="text-[#1CD8D2] hover:underline"
            >
              souvikj572@gmail.com
            </a>
          </p>

          <form className="flex flex-col gap-5 mt-6" onSubmit={handleSubmit}>
            {/* Name field */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-300">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-lg bg-gray-800/50 backdrop-blur border ${
                  errors.name ? "border-red-500" : "border-blue-400/30"
                } text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-gray-800/80 transition-all duration-200`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email / Phone field */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-300">
                Email or Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="Your email or phone number"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-lg bg-gray-800/50 backdrop-blur border ${
                  errors.email ? "border-red-500" : "border-blue-400/30"
                } text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-gray-800/80 transition-all duration-200`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message textarea */}
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-300">
                Message <span className="text-red-400">*</span>
              </label>

              <textarea
                name="message"
                rows={5}
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                className={`p-3 rounded-lg bg-gray-800/50 backdrop-blur border ${
                  errors.message ? "border-red-500" : "border-blue-400/30"
                } text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 focus:bg-gray-800/80 transition-all duration-200 resize-none`}
              />

              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Status message */}
            {status && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error"
                    ? "text-red-400"
                    : "text-blue-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully ✅"
                  : "Something went wrong ❌"}
              </motion.p>
            )}

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={status === "sending"}
              type="submit"
              className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-60 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
