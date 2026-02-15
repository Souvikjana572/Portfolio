import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import ParticleBackground from "../components/Particlesbackground";
import Astra from "../assets/Astra.png";

// Read EmailJS credentials from Vite env vars.
// Fallbacks keep production working when host env vars are missing.
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
    } catch (err) {
      console.error("EmailJS Error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="w-full min-h-screen relative bg-black overflow-hidden text-white py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
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

      <ParticleBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
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

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-xl p-8 rounded-2xl shadow-lg border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300"
        >
          <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-300">
            Let&apos;s Get in Touch
          </h2>
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

            {status && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${
                  status === "success"
                    ? "text-green-400"
                    : status === "error" || status === "config_error"
                    ? "text-red-400"
                    : "text-blue-400"
                }`}
              >
                {status === "sending"
                  ? "Sending..."
                  : status === "success"
                  ? "Message sent successfully."
                  : status === "config_error"
                  ? "Email service is not configured."
                  : "Something went wrong."}
              </motion.p>
            )}

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
