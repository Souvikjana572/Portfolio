import { useEffect, useRef } from 'react';

export default function Particlesbackground(){
    const canvasRef = useRef(null);
    
    useEffect(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');//getContext used for drawing on the canvas

        let particles = [];
        let numParticles = 70;
        const colors = ["rgba(240, 147, 147, 0.7)"];

        class Particle {
            constructor(){
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.radius = Math.random() * 2 + 1;// +1 to make sure the radius is not 0
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
            }
            draw(){
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update(){
                this.x += this.speedX;
                this.y += this.speedY;
                if(this.x < 0 ){
                    this.x=canvas.width;
                }
                if(this.x > canvas.width ){
                    this.x=0;
                }
                if(this.y < 0){
                    this.y=canvas.height;
                }
                if(this.y > canvas.height){
                    this.y=0;
                }
                this.draw();
            }
        }
        
        function createParticles(){
            particles = [];
            for(let i=0; i<numParticles; i++){
                particles.push(new Particle());
            }
        }
        
        function resize(){
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            createParticles();
        }
        
        let animateId = null;
        function animate(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for(let i=0; i<particles.length; i++){
                particles[i].update();
            }
            animateId = requestAnimationFrame(animate);
        }
        
        // Initialize after canvas is ready
        requestAnimationFrame(() => {
            resize();
            animate();
        });
        
        window.addEventListener('resize', resize);
        
        return () => {
            window.removeEventListener('resize', resize);
            if (animateId) {
                cancelAnimationFrame(animateId);
            }
        };
    }, []);
    return (
        <canvas 
        ref={canvasRef}
        className='fixed top-0 left-0 w-full h-full pointer-events-none z-0'
        ></canvas>
    );
}