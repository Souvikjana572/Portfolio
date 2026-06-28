import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaGithub, FaLock } from "react-icons/fa";
// motion: for animating elements
// useScroll: to track scroll position
// AnimatePresence: to animate components when mounting/unmounting

// Importing project images (desktop & mobile versions)
import img1 from "../assets/SOLIX.png";
import img2 from "../assets/StudentMS.png";
import img3 from "../assets/chess1.png";
import photo1 from "../assets/solixMobile.png";
import photo2 from "../assets/studentms1.png";
import photo3 from "../assets/CHESS.png";

const MH3 = motion.h3;
// Shortcut for <motion.h3> for easier typing

// 🔹 Custom Hook: Detects if screen size matches "mobile"
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = React.useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
    // Checks if the screen width is <= 639px (mobile breakpoint)
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query); // Media query list
    const handler = (e) => setIsMobile(e.matches); // Update state when query changes
    mql.addEventListener?.("change", handler) || mql.addListener(handler);
    // Add correct event listener (modern OR fallback)

    setIsMobile(mql.matches); // Initialize with current screen size
    return () =>
      mql.removeEventListener?.("change", handler) || mql.removeListener(handler);
    // Cleanup event listener
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  // Detect if the user is on a mobile screen

  // 🔹 List of project objects (dynamic images based on screen size)
  const projects = React.useMemo(
    () => [
      {
        title: "Solix - Health Monitoring App",
        bgColor: "#03141c",
        sceneBg: isMobile
          ? "#03141c"
          : "radial-gradient(circle at 16% 24%, rgba(255, 214, 80, 0.14), transparent 28%), radial-gradient(circle at 82% 18%, rgba(61, 139, 255, 0.18), transparent 32%), radial-gradient(circle at 30% 82%, rgba(151, 80, 255, 0.18), transparent 34%), linear-gradient(135deg, #05060f 0%, #080a18 46%, #06111f 100%)",
        image: isMobile ? photo1 : img1, // Mobile vs desktop image
        imageBg: isMobile
          ? "#03141c"
          : "radial-gradient(circle at 14% 18%, rgba(255, 214, 80, 0.14), transparent 28%), radial-gradient(circle at 82% 22%, rgba(75, 145, 255, 0.16), transparent 30%), radial-gradient(circle at 24% 86%, rgba(143, 76, 255, 0.1), transparent 34%), linear-gradient(135deg, #08070d 0%, #100d16 28%, #170b36 46%, #071f40 72%, #32250a 100%)",
        imageFit: isMobile ? "cover" : "contain",
        imageWidth: isMobile ? "100%" : "78%",
        description:
          "An A.I. health monitoring app that tracks user health data, provides insights, and integrates with Gemini API for advanced analytics.",
        technologies:
          "Flutter, Dart, Firebase Core, Firebase Auth, Cloud Firestore, Firebase Storage, Gemini API ",
        status: "In production. release soon",
      },
      {
        title: "Student Management System",
        repo: "https://github.com/Souvikjana572/Student-Management-System",
        bgColor: "#03141c",
        image: isMobile ? photo2 : img2, // Mobile vs desktop image
        imageBg: "#03141c",
        imageFit: "cover",
        imageWidth: "100%",
        description:
          "Role-based platform for Admin, Teacher, and Student workflows including attendance, marks, assignments, and course management.",
        technologies: "React, React Router, React Bootstrap, Node.js, Express, MongoDB, Mongoose, JWT, Axios",
      },
      {
        title: "Chess",
        repo: "https://github.com/Souvikjana572/Chess",
        bgColor: "#000000ff",
        sceneBg:
          "radial-gradient(circle at 18% 20%, rgba(38, 202, 139, 0.16), transparent 30%), radial-gradient(circle at 82% 78%, rgba(34, 139, 34, 0.22), transparent 34%), linear-gradient(135deg, #050302 0%, #0b110dff 46%, #072418ff 100%)",
        image: isMobile ? photo3 : img3,
        imageBg: isMobile
          ? "#000000"
          : "#091810ff",
        imageFit: isMobile ? "cover" : "contain",
        imageWidth: isMobile ? "100%" : "78%",
        description:
          "Real-time 1v1 multiplayer chess app with live move sync for players and spectators, including game-over and reset flow.",
        technologies: "Node.js, Express, Socket.IO, EJS, Vanilla JavaScript, chess.js, Tailwind CSS",
      },
    ],
    [isMobile]
    // Memoize to prevent recalculating unless screen size changes
  );

  const sceneRef = React.useRef(null);
  // Reference to the whole projects section (used for scroll tracking)

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
    // Scroll progress is 0 when section top hits viewport top and 1 at the end
  });
  const exitFadeOpacity = useTransform(scrollYProgress, [0.74, 1], [0, 1]);

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  // Array of thresholds to switch between projects as user scrolls
  const [activeIndex, setActiveIndex] = React.useState(0);
  // Keeps track of which project is currently active

  // 🔹 Update activeIndex as user scrolls
  React.useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((v) => {
      const idx = thresholds.findIndex((t) => v <= t);
      // Find the first threshold that is greater than or equal to scroll progress
      setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
      // If not found, show the last project
    });
    return () => unsubscribe();
    // Cleanup scroll listener
  }, [scrollYProgress, thresholds]);

  const activeProject = projects[activeIndex];
  // Currently displayed project

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${100 * projects.length}vh`,
        // Section height = 100vh per project (makes scroll-based transitions work) 
        background: activeProject.sceneBg || activeProject.bgColor,
        // Background changes color based on active project
        transition: "none",
      }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 bg-black"
        style={{ opacity: exitFadeOpacity }}
      />

      {/* Sticky container keeps content fixed while scrolling */}
      <div className="sticky top-0 z-10 h-screen flex flex-col items-center justify-center">

        {/* Section Title */}
        <h2 className={`text-3xl font-semibold z-10 text-center ${isMobile ? "mt-4" : "mt-8"}`}>
          My Work
        </h2>

        {/* Main Project Display Area */}
        <div className={`relative w-full flex-1 flex items-center justify-center ${isMobile ? "-mt-4" : ""}`}>
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0 sm:z-10"
                }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              {/* Animate project title when switching */}
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <MH3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`hidden sm:block text-center text-white/95 sm:absolute sm:-top-18 sm:left-[18%] lg:left-[-14%] sm:mb-0 sm:text-4xl lg:text-5xl font-bangers italic font-semibold`}
                    style={{ zIndex: 5, textAlign: "left" }}
                  >
                    {project.title}
                  </MH3>
                )}
              </AnimatePresence>

              {/* Project Image Wrapper */}
              <div
                className={`relative flex w-full items-center justify-center overflow-hidden bg-black/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"
                  } h-[62vh] sm:h-[66vh]`}
                style={{
                  zIndex: 10,
                  transition: "box-shadow 250ms ease",
                  background: project.imageBg,
                }}
              >
                {/* Project Image */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full max-h-full drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    position: "relative",
                    zIndex: 10,
                    width: project.imageWidth,
                    objectFit: project.imageFit,
                    filter: "drop-shadow(0 16px 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                {/* Subtle gradient overlay for better readability */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    zIndex: 11,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 40%)",
                  }}
                />
              </div>

              <div className="mx-auto -mt-2 w-full max-w-4xl rounded-xl border border-white/20 bg-black/35 p-4 sm:p-5 backdrop-blur-sm">
                {isMobile && (
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <h3 className="text-xl font-bangers italic font-semibold text-white/95">
                      {project.title}
                    </h3>
                    {project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center rounded-lg bg-white/95 p-2 text-black shadow-md"
                        aria-label={`Open ${project.title} GitHub repository`}
                      >
                        <FaGithub className="text-xl" />
                      </a>
                    ) : (
                      <span
                        className="inline-flex items-center justify-center rounded-lg bg-white/95 p-2 text-black shadow-md"
                        aria-label={`${project.title} is a private project`}
                        title="Private project"
                      >
                        <FaLock className="text-xl" />
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                  {project.description}
                </p>
                <p className="mt-2 text-xs sm:text-sm text-cyan-200/90">
                  <span className="font-semibold text-white">Tech:</span> {project.technologies}
                </p>
                {project.status && (
                  <p className="mt-2 text-xs sm:text-sm text-amber-100/90">
                    <span className="font-semibold text-white">Status:</span> {project.status}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* GitHub Repo Button */}
        {activeProject?.repo ? (
          <div className="absolute right-4 sm:right-[clamp(2.5rem,4vw,8rem)] top-1/2 -translate-y-1/2 z-30 hidden sm:block">
            <a
              href={activeProject.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-3 sm:px-5 sm:py-3 rounded-xl bg-white/95 text-black hover:bg-white transition-all shadow-lg"
              aria-label={`Open ${activeProject.title} GitHub repository`}
            >
              <FaGithub className="text-2xl sm:text-3xl" />
            </a>
          </div>
        ) : (
          <div className="absolute right-4 sm:right-[clamp(2.5rem,4vw,8rem)] top-1/2 -translate-y-1/2 z-30 hidden sm:block">
            <span
              className="inline-flex items-center justify-center px-4 py-3 sm:px-5 sm:py-3 rounded-xl bg-white/95 text-black shadow-lg"
              aria-label={`${activeProject?.title} is a private project`}
              title="Private project"
            >
              <FaLock className="text-2xl sm:text-3xl" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
