import { useState, useEffect, useRef } from "react";
import OverlayMenu from "./OverlayMenu";
import { FiMenu, FiVolume2, FiVolumeX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/LOGO.png";
import { toggleSound, isSoundEnabled, playUiSound } from "../utils/sound";

const NAV_LINKS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [soundOn, setSoundOn] = useState(false);
  const lastScrollY = useRef(0);
  const timerId = useRef(null);

  // Active section scroll spy
  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "experience", "education", "contact"];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollSpy);
  }, []);

  // Show / Hide navbar logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current + 10) {
        // scrolling down -> hide
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        // scrolling up -> show
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current);
        timerId.current = setTimeout(() => {
          if (window.scrollY > 300) setVisible(false);
        }, 4000);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, []);

  const handleSoundToggle = () => {
    const state = toggleSound();
    setSoundOn(state);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 py-3.5 flex justify-center ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-24 opacity-0 pointer-events-none"
        }`}
      >
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-slate-950/75 backdrop-blur-2xl border border-white/10 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)]">
          {/* Logo */}
          <a
            href="#home"
            onClick={() => playUiSound("click")}
            className="flex items-center space-x-2.5 group cursor-pointer"
            data-cursor-text="Home"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 group-hover:scale-105 transition-transform">
              <img src={Logo} alt="Logo" className="w-full h-full object-cover rounded-full bg-black" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
              Souvik<span className="text-cyan-400">.</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => playUiSound("tab")}
                  data-cursor-text={link.name}
                  className={`relative px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-white"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-400/40 -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Actions: Sound toggle + CTA + Mobile Menu */}
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            {/* Audio Toggle button */}
            <button
              onClick={handleSoundToggle}
              title={soundOn ? "Mute interactive audio" : "Enable interactive audio"}
              aria-label="Toggle UI Sound"
              className={`p-2 rounded-full border transition-all duration-300 text-xs flex items-center justify-center ${
                soundOn
                  ? "bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20"
              }`}
            >
              {soundOn ? <FiVolume2 className="text-base" /> : <FiVolumeX className="text-base" />}
            </button>

            {/* Reach out CTA (Desktop) */}
            <motion.a
              href="#contact"
              onClick={() => playUiSound("click")}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden lg:inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-md hover:shadow-cyan-500/25 transition-all"
            >
              Reach Out
            </motion.a>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => {
                playUiSound("click");
                setMenuOpen(true);
              }}
              className="md:hidden p-2 rounded-xl text-white hover:bg-white/10 text-2xl transition-colors focus:outline-none"
              aria-label="Open navigation menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </header>

      <OverlayMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}