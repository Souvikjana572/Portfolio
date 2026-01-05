import Navbar from './componenets/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonial from './sections/Testimonial'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import ParticlesBackground from './componenets/particlesbackground'
import Customcursor from './componenets/Customcursor'
export default function App() {

  return (
    <>
      <ParticlesBackground />
      <Customcursor />
      <div className='gradient' text-white>
        
        <Navbar />
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonial />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

