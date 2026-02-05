
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import avatar from "../assets/avator.png";
import resumePdf from "../assets/Resume.pdf";
import { FaGithub } from "react-icons/fa6";
import { SiCodeforces, SiCodechef, SiLeetcode, SiGeeksforgeeks, SiChessdotcom } from "react-icons/si";
import ParticleBackground from "../components/Particlesbackground";

const socials = [
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Souvikjana572" },
  { Icon: SiCodeforces, label: "Codeforces", href: "https://codeforces.com/profile/souvik_jana_" },
  { Icon: SiCodechef, label: "CodeChef", href: "https://www.codechef.com/users/sjana" },
  { Icon: SiLeetcode, label: "LeetCode", href: "https://leetcode.com/u/souvikjana/" },
  { Icon: SiGeeksforgeeks, label: "GeeksforGeeks", href: "https://www.geeksforgeeks.org/profile/souvikjanaboss" },
  { Icon: SiChessdotcom, label: "Chess.com", href: "https://www.chess.com/member/souvik_jana" },
];


const glowVariants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.2,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(59,130,246,0.8)) drop-shadow(0 0 18px rgba(168,85,247,0.7))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: {
    scale: 0.95,
    y: 0,
    transition: { duration: 0.08 },
  },
};

const Home = React.forwardRef((props, ref) => {
  const roles = useMemo(
    () => ["Software Developer", "Web Developer", "Competitive Programmer"],
    []
  );
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  // typing effect logic
  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
      else if (!deleting && subIndex === current.length)
        setTimeout(() => setDeleting(true), 1200);
      else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
      else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60); // original typing speed
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, index, roles]);

  return (
    <section
      ref={ref}
      id="home"
      className="h-screen w-full relative overflow-hidden bg-black"
    >
      <ParticleBackground />

      {/* gradient blobs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute -top-32 -left-32 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw]
          max-w-[500px] max-h-[500px]
          rounded-full
          bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/20
          opacity-40 sm:opacity-30 md:opacity-20
          blur-[100px] sm:blur-[130px] md:blur-[150px]
          animate-pulse"
        />
        <motion.div
          className="absolute bottom-0 right-0 
          w-[70vw] sm:w-[50vw] md:w-[40vw] 
          h-[70vw] sm:h-[50vw] md:h-[40vw] 
          max-w-[500px] max-h-[500px] 
          rounded-full 
          bg-gradient-to-r from-purple-500/30 via-blue-500/30 to-purple-500/20
          opacity-50 sm:opacity-40 md:opacity-30
          blur-[100px] sm:blur-[130px] md:blur-[150px] 
          animate-pulse delay-500"
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* left */}
        <motion.div
          className="flex flex-col justify-center h-full text-center lg:text-left relative"
          initial={{ opacity: 0, y: 120 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">
            {/* typing text */}
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[2px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* name */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text 
              bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              Hello, I&apos;m
              <br />
              <span className="text-white font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl lg:whitespace-nowrap">
                Souvik Jana
              </span>
            </motion.h1>

            {/* description */}
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              I enjoy breaking down complex problems and turning ideas into reliable web applications —
              combining software development with competitive problem-solving.
            </motion.p>

            {/* buttons */}
            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full text-lg font-semibold text-white 
                bg-gradient-to-r from-blue-500 to-purple-500
                shadow-lg hover:shadow-xl transition-all"
              >
                View My Work
              </motion.a>
              <motion.a
                href={resumePdf}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full text-lg font-semibold text-black bg-white 
                hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all"
              >
                View Resume
              </motion.a>
            </motion.div>

            {/* socials */}
            <motion.div
              className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
            >
              {socials.map(({ Icon, label, href }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={glowVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  className="text-gray-300"
                >
                  <Icon />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* right */}
        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1 }}
        >
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 410px)",
              height: "min(40vw, 760px)",
              borderRadius: "50%",
              filter: "blur(38px)",
              opacity: 0.35,
              background:
                "conic-gradient(from 0deg, #3b82f6, #a855f7, #3b82f6)",
            }}
          />
          <motion.img
            src={avatar}
            alt="Souvik Jana avatar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{ right: "-30px", width: "min(45vw, 780px)", maxHeight: "90vh" }}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </motion.div>
      </div>
    </section>
  );
});

export default Home;