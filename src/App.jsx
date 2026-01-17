import Navbar from './components/Navbar'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Testimonial from './sections/Testimonial'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Customcursor from './components/Customcursor'
export default function App() {

  return (
    <>
      <Customcursor />
      <div className='gradient text-white'>
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

