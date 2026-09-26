import { useState } from "react";
import IntroAnimation from "./components/IntroAnimation";
import Navbar from "./components/Navbar";
import CustomCursor from "./components/Customcursor";
import Home from "./sections/Home";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";
import Education from "./sections/Education";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative bg-[#05070f] text-slate-100 min-h-screen selection:bg-purple-500/30 selection:text-white">
      <CustomCursor />
      <Navbar />

      {/* Intro always on top until it finishes */}
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}

      {/* Homepage */}
      <Home introDone={introDone} />

      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
