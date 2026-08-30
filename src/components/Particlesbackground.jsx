import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let width = 0;
    let height = 0;

    // Mouse & Touch interaction state
    const mouse = {
      x: null,
      y: null,
      radius: 170,
    };

    // Color Palette matching portfolio theme
    const colors = [
      { r: 59, g: 130, b: 246 },  // Electric Blue (#3b82f6)
      { r: 168, g: 85, b: 247 }, // Neon Purple (#a855f7)
      { r: 6, g: 182, b: 212 },   // Cyan (#06b6d4)
      { r: 255, g: 255, b: 255 }, // Glowing White
    ];

    // Particle Blueprint
    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseRadius = Math.random() * 2 + 1; // 1px to 3px
        this.radius = this.baseRadius;
        this.colorObj = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 0.75;
        this.speedY = (Math.random() - 0.5) * 0.75;
        this.pulseAngle = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
        this.alpha = 0.4 + Math.random() * 0.5;
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        const { r, g, b } = this.colorObj;

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${this.alpha})`;
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.8)`;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
      }

      update() {
        // Move particle
        this.x += this.speedX;
        this.y += this.speedY;

        // Subtle radius pulse
        this.pulseAngle += this.pulseSpeed;
        this.radius = this.baseRadius + Math.sin(this.pulseAngle) * 0.4;

        // Screen boundary wrap-around
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse repelling / magnetic reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.hypot(dx, dy);

          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * 2.5;
            const directionY = forceDirectionY * force * 2.5;

            this.x -= directionX;
            this.y -= directionY;
          }
        }

        this.draw();
      }
    }

    // Initialize particles array based on screen density
    function initParticles() {
      particles = [];
      const count = width < 768 ? 42 : 85;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    }

    // Draw Constellation Lines between nearby particles & mouse
    function connectConstellations() {
      const maxConnectDist = 115;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxConnectDist) {
            const opacity = 1 - dist / maxConnectDist;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.28})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Connect particle to mouse if nearby
        if (mouse.x !== null && mouse.y !== null) {
          const dxMouse = particles[a].x - mouse.x;
          const dyMouse = particles[a].y - mouse.y;
          const distMouse = Math.hypot(dxMouse, dyMouse);

          if (distMouse < mouse.radius) {
            const opacity = 1 - distMouse / mouse.radius;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.45})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
            ctx.restore();
          }
        }
      }
    }

    // Canvas Resize Observer
    const parentContainer = canvas.parentElement || document.body;

    const handleResize = () => {
      width = parentContainer.clientWidth || window.innerWidth;
      height = parentContainer.clientHeight || window.innerHeight;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      initParticles();
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(parentContainer);
    handleResize();

    // Mouse / Touch Event Listeners
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseLeave, { passive: true });

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Connect lines first behind nodes
      connectConstellations();

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden"
    />
  );
}