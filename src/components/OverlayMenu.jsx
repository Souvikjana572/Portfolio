import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";

export default function OverlayMenu({ isOpen, onClose }) {
    const isMobile= typeof window !== "undefined" && window.innerWidth<1024;
    const origin =isMobile?"95% 8%":"50% 8%"
  const items = [
    "Home",
    "About",
    "Skills",
    "Projects",
    "Experience",
    "Testimonial",
    "Contact",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
          initial={{ clipPath: `circle(0% at ${origin})`}}
          animate={{ clipPath: `circle(150% at ${origin})`}}
          exit={{ clipPath: `circle(0% at ${origin})`}}
          transition={{ duration: 0.7, ease:[0.4, 0.0, 0.2, 1] }}
          style={{backgroundColor:"rgba(0.0, 0.0, 0.0, 0.95)"}}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-6 text-white text-3xl focus:outline-none"
            aria-label="Close menu"
          >
            <FiX />
          </button>

          <ul className="space-y-6 text-center">
            {items.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.2 + index * 0.05, duration: 0.25 }}
              >
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={onClose}
                  className="text-3xl md:text-4xl text-white font-semibold hover:text-pink-500 transition-colors duration-300"
                >
                  {item}
                </a>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}