import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaArrowUp,
} from "react-icons/fa6";
import { playUiSound } from "../utils/sound";

const socials = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Souvikjana572", color: "hover:text-white hover:border-white/40" },
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/souvik-jana-22915a1bb/", color: "hover:text-blue-400 hover:border-blue-400/40" },
  { Icon: FaXTwitter, label: "X / Twitter", href: "https://x.com/Souvikjana007", color: "hover:text-cyan-400 hover:border-cyan-400/40" },
  { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/souv.ikjana650/", color: "hover:text-pink-400 hover:border-pink-400/40" },
  { Icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/profile.php?id=100087390676127", color: "hover:text-indigo-400 hover:border-indigo-400/40" },
];

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

const Footer = () => {
  const scrollToTop = () => {
    playUiSound("button");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-[#04060c] border-t border-white/10 pt-16 pb-12">
      {/* Background ambient neon glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_50%_0%,rgba(59,130,246,0.12),transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center">
        {/* Scroll Back to Top Button */}
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          className="mb-8 p-3.5 rounded-full bg-slate-900 border border-white/20 text-cyan-300 hover:text-white hover:border-cyan-400 hover:bg-slate-800 transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          title="Back to Top"
          aria-label="Back to Top"
          data-cursor-text="Top"
        >
          <FaArrowUp className="text-sm" />
        </motion.button>

        {/* Branding & Name */}
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white select-none">
          Souvik <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">Jana</span>
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-mono text-cyan-300 uppercase tracking-widest">
          Software Engineer • Distributed Systems • Full Stack
        </p>

        {/* Quick Nav Links */}
        <nav className="my-8 flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => playUiSound("tab")}
              className="hover:text-cyan-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Social Media Links */}
        <div className="flex gap-3 mb-8">
          {socials.map(({ Icon, label, href, color }) => (
            <motion.a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playUiSound("click")}
              whileHover={{ scale: 1.15, y: -2 }}
              whileTap={{ scale: 0.95 }}
              data-cursor-text={label}
              className={`p-3 rounded-2xl bg-slate-900/80 border border-white/10 text-slate-300 text-lg transition-all duration-200 ${color}`}
            >
              <Icon />
            </motion.a>
          ))}
        </div>

        {/* Quote */}
        <p className="text-xs sm:text-sm text-slate-400 italic max-w-md">
          &ldquo;Success is when preparation meets opportunity.&rdquo;
        </p>

        {/* Copyright */}
        <p className="mt-6 text-[11px] font-mono text-slate-500">
          © {new Date().getFullYear()} Souvik Jana. Engineered with React, Tailwind CSS, &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;