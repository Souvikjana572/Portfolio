import { useEffect, useState } from 'react'

export default function Customcursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    useEffect(()=>{
        const moveHandler =(e)=>{
            setPosition({x:e.clientX, y:e.clientY});
        };
        window.addEventListener('mousemove', moveHandler);
        return ()=>{
            window.removeEventListener('mousemove', moveHandler);
        }
    }, [])
    return (
        <div className='fixed top-0 left-0 pointer-events-none z-[9999]' 
        style={{transform: `translate(${position.x-20}px, ${position.y-20}px)`}} >
            <div className='w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 blur-3xl opacity-80'></div>
        </div>
    )
} 