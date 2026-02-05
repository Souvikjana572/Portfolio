import { FaJava, FaReact } from 'react-icons/fa';
import {
  SiTypescript,
  SiPython,
  SiMongodb,
  SiAngular,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiExpress,
  SiCplusplus,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiThreedotjs,
  SiIntellijidea,
  SiAmazonwebservices,
  SiAmazonec2,
  SiAwslambda,
  SiAmazons3,
  SiAmazoncloudwatch,
  SiMysql,
  SiGithubactions,
  SiChartdotjs,
} from 'react-icons/si';
import { DiNodejsSmall } from 'react-icons/di';
import { VscVscode } from 'react-icons/vsc';
import { motion, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';


export default function Skills() {

const skills = [
    // Languages
    { icon: <FaJava />, name: "Java" },
    { icon: <SiCplusplus />, name: "C/C++" },
    { icon: <SiPython />, name: "Python" },
    { icon: <SiJavascript />, name: "JavaScript" },
    { icon: <SiTypescript />, name: "TypeScript" },
    { icon: <SiMysql />, name: "SQL" },
    // Web Technologies
    { icon: <SiHtml5 />, name: "HTML" },
    { icon: <SiCss3 />, name: "CSS" },
    { icon: <FaReact />, name: "React" },
    { icon: <DiNodejsSmall />, name: "Node.js" },
    { icon: <SiExpress />, name: "Express.js" },
    { icon: <SiMongodb />, name: "MongoDB" },
    { icon: <SiAngular />, name: "Angular" },
    // Cloud & DevOps
    { icon: <SiAmazonwebservices />, name: "AWS" },
    { icon: <SiAmazonec2 />, name: "EC2" },
    { icon: <SiAwslambda />, name: "Lambda" },
    { icon: <SiAmazons3 />, name: "S3" },
    { icon: <SiAmazoncloudwatch />, name: "CloudWatch" },
    { icon: <SiGithubactions />, name: "CI/CD" },
    // Developer Tools
    { icon: <SiGit />, name: "Git" },
    { icon: <VscVscode />, name: "VS Code" },
    { icon: <SiIntellijidea />, name: "IntelliJ" },
    { icon: <SiJupyter />, name: "Jupyter" },
    // Libraries
    { icon: <SiCplusplus />, name: "C++ STL" },
    { icon: <SiPandas />, name: "pandas" },
    { icon: <SiNumpy />, name: "NumPy" },
    { icon: <SiChartdotjs />, name: "Matplotlib" },
    { icon: <SiThreedotjs />, name: "Three.js" },
  ];
const repeated = [...skills , ...skills]

const [dir , setDir] = useState(-1);
const [active , setActive] = useState(false);
const sectionRef = useRef(null);
const trackRef = useRef(null);
const touchY = useRef(null);
const x= useMotionValue(0);

useEffect(()=> {
const el = sectionRef.current;
if(!el) return;

const io = new IntersectionObserver((
  [entry]) => {
    setActive(entry.isIntersecting && entry.intersectionRatio > 0.1);
  }, 
{ threshold : [0.1 ] }
)
io.observe(el);
return () => io.disconnect();

}, [])

useEffect(()=> {
  if(!active) return;

  const onWheel = (e) => setDir(e.deltaY > 0 ? -1 : 1);
  const onTouchStart = (e) => (touchY.current = e.touches[0].clientY);
  const onTouchMove = (e) => {
    if(touchY.current == null) return;
    const delta = e.touches[0].clientY - touchY.current;
    setDir( delta > 0 ? 1 : -1);
    touchY.current = e.touches[0].clientY; 
  };
  window.addEventListener('wheel' , onWheel , {passive : true});
  window.addEventListener('touchstart' , onTouchStart , {passive : true});
  window.addEventListener('touchmove' , onTouchMove , {passive : true});

  return () => {
    window.removeEventListener('wheel' , onWheel);
    window.removeEventListener('touchstart' , onTouchStart);
    window.removeEventListener('touchmove' , onTouchMove);
  }
},[active]);



useEffect(()=> {
  let id;
  let last = performance.now();
  const SPEED = 80;

  const tick = (now) => {
    const dt = (now -last)/1000;
    last = now;
    let next = x.get() + SPEED*dir*dt;
    const loop = trackRef.current?.scrollWidth/2 || 0;

    if(loop){
      if(next <= -loop) next += loop;
      if(next >= 0) next -= loop;
    }
    x.set(next)
    id = requestAnimationFrame(tick)
  }
  id = requestAnimationFrame(tick)
  return () => cancelAnimationFrame(id);
}, [dir , x]);


  return(
    <section id="skills" 
    ref={sectionRef}
    className="relative w-full py-20 flex flex-col items-center justify-center bg-black text-white overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="absolute top-0 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className='relative z-10'>
        <motion.h2 className='text-4xl mt-5 sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 z-10 text-center'
        initial={{opacity:0 , y: -30}}
        whileInView={{opacity:1 , y:0}}
        transition={{duration:0.5 , delay:0.1 }}
        >
          My Skills
        </motion.h2>
        <motion.p className='mt-2 mb-12 text-gray-300 text-base sm:text-lg z-10 text-center'
        initial={{opacity:0 , y: -10}}
        whileInView={{opacity:1 , y:0}}
        transition={{duration:0.5 , delay:0.1 }}
        >
          Crafted with modern technologies and best practices
        </motion.p>
      </div>

      <div  className='relative w-full overflow-hidden px-6'>
        <motion.div 
          ref={trackRef}
          className='flex gap-10 text-5xl'
          style={{x, whiteSpace: "nowrap" , willChange: "transform"}}
        >
          {repeated.map((s,i) => (
            <motion.div 
              key={i} 
              className='flex flex-col items-center gap-3 min-w-[140px] p-4 rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-md hover:border-blue-400/60 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 group'
              aria-label={s.name}
              title={s.name}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <span className='text-blue-300 group-hover:text-blue-200 transition-colors duration-300'>
                {s.icon}
              </span>
              <p className='text-sm text-gray-300 group-hover:text-white transition-colors duration-300 font-medium text-center'>
                {s.name}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}