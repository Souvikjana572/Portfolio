import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { playUiSound } from "../utils/sound";
import { FaGithub, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

const MENU_ITEMS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function OverlayMenu({ isOpen, onClose }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 1024;
  const origin = isMobile ? "92% 5%" : "50% 5%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center z-[100] bg-slate-950/95 backdrop-blur-2xl"
          initial={{ clipPath: `circle(0% at ${origin})` }}
          animate={{ clipPath: `circle(150% at ${origin})` }}
          exit={{ clipPath: `circle(0% at ${origin})` }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Close Button */}
          <button
            onClick={() => {
              playUiSound("click");
              onClose();
            }}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white text-2xl hover:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          {/* Navigation Links */}
          <ul className="space-y-5 text-center">
            {MENU_ITEMS.map((item, index) => (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.06 }}
              >
                <a
                  href={item.href}
                  onClick={() => {
                    playUiSound("tab");
                    onClose();
                  }}
                  className="text-3xl sm:text-4xl text-slate-300 font-bold hover:text-cyan-300 transition-colors block py-1"
                >
                  {item.name}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Quick Socials in Drawer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex items-center gap-4 text-xl text-slate-400"
          >
            <a
              href="https://github.com/Souvikjana572"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 hover:text-white transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/souvik-jana-22915a1bb/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 hover:text-blue-400 transition-colors"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://x.com/Souvikjana007"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-white/5 hover:text-cyan-400 transition-colors"
            >
              <FaXTwitter />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}