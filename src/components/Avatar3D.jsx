import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Avatar3D() {
  const mountRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 550;
    const height = container.clientHeight || 550;

    // Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Parent group for drag & parallax rotation
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // ----------------------------------------------------
    // 1. Inner Multi-Faceted Crystal Core
    // ----------------------------------------------------
    const crystalGeo = new THREE.OctahedronGeometry(1.1, 2);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.7,
      metalness: 0.85,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      flatShading: true,
    });
    const crystalCore = new THREE.Mesh(crystalGeo, crystalMat);
    mainGroup.add(crystalCore);

    // ----------------------------------------------------
    // 2. Geodesic Outer Wireframe Cage
    // ----------------------------------------------------
    const cageGeo = new THREE.IcosahedronGeometry(1.65, 2);
    const cageMat = new THREE.MeshPhysicalMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.6,
      metalness: 0.9,
      roughness: 0.1,
      wireframe: true,
    });
    const cageMesh = new THREE.Mesh(cageGeo, cageMat);
    mainGroup.add(cageMesh);

    // ----------------------------------------------------
    // 3. Holographic Pulse Energy Sphere
    // ----------------------------------------------------
    const pulseGeo = new THREE.SphereGeometry(1.85, 32, 32);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.12,
      wireframe: true,
      blending: THREE.AdditiveBlending,
    });
    const pulseSphere = new THREE.Mesh(pulseGeo, pulseMat);
    mainGroup.add(pulseSphere);

    // ----------------------------------------------------
    // 4. Concentric Orbital Holographic Rings
    // ----------------------------------------------------
    const ring1Geo = new THREE.TorusGeometry(2.35, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.75, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0xa855f7,
      emissive: 0x7e22ce,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 4;
    mainGroup.add(ring2);

    // ----------------------------------------------------
    // 5. Orbiting Tech Satellite Orbs
    // ----------------------------------------------------
    const satellites = [];
    const satCount = 4;
    const satColors = [0x60a5fa, 0xc084fc, 0x34d399, 0xf472b6];
    const satRadii = [2.2, 2.6, 3.0, 3.4];
    const satSpeeds = [1.2, -0.9, 0.7, -1.1];

    const satGroup = new THREE.Group();
    mainGroup.add(satGroup);

    for (let i = 0; i < satCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const satMat = new THREE.MeshStandardMaterial({
        color: satColors[i],
        emissive: satColors[i],
        emissiveIntensity: 1.2,
        roughness: 0.1,
        metalness: 0.9,
      });
      const satMesh = new THREE.Mesh(satGeo, satMat);

      // Light source attached to each satellite
      const satLight = new THREE.PointLight(satColors[i], 1.5, 4);
      satMesh.add(satLight);

      satellites.push({
        mesh: satMesh,
        radius: satRadii[i],
        speed: satSpeeds[i],
        angle: (i * Math.PI) / 2,
        tilt: (i * Math.PI) / 5,
      });

      satGroup.add(satMesh);
    }

    // ----------------------------------------------------
    // 6. Particle Vortex Swarm
    // ----------------------------------------------------
    const particleCount = 320;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleAngles = new Float32Array(particleCount);
    const particleRadii = new Float32Array(particleCount);
    const particleY = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const r = 2.0 + Math.random() * 2.2;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;

      particlePos[i * 3] = r * Math.cos(angle);
      particlePos[i * 3 + 1] = y;
      particlePos[i * 3 + 2] = r * Math.sin(angle);

      particleAngles[i] = angle;
      particleRadii[i] = r;
      particleY[i] = y;
    }

    particleGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePos, 3)
    );

    const particleMat = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.055,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // ----------------------------------------------------
    // 7. Lighting
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 4, 12);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4, 12);
    purpleLight.position.set(-5, -5, 5);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 10);
    cyanLight.position.set(0, 0, 6);
    scene.add(cyanLight);

    // ----------------------------------------------------
    // 8. Interaction State (Mouse & Touch Dragging)
    // ----------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let targetScale = 1.0;

    let isDown = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let velX = 0;
    let velY = 0;

    const onMouseDown = (e) => {
      isDown = true;
      setIsDragging(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Parallax target
      mouseX = (x / rect.width - 0.5) * 1.5;
      mouseY = (y / rect.height - 0.5) * 1.5;

      // Dragging rotation
      if (isDown) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;

        velY += deltaX * 0.005;
        velX += deltaY * 0.005;

        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const onMouseUp = () => {
      isDown = false;
      setIsDragging(false);
    };

    const onMouseEnter = () => {
      targetScale = 1.08;
    };

    const onMouseLeave = () => {
      targetScale = 1.0;
      isDown = false;
      setIsDragging(false);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    domElement.addEventListener("mouseenter", onMouseEnter);
    domElement.addEventListener("mouseleave", onMouseLeave);

    // Touch events for drag interaction on touch desktop / tablet devices
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDown = true;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e) => {
      if (isDown && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMouseX;
        const deltaY = e.touches[0].clientY - previousMouseY;
        velY += deltaX * 0.005;
        velX += deltaY * 0.005;
        previousMouseX = e.touches[0].clientX;
        previousMouseY = e.touches[0].clientY;
      }
    };
    const onTouchEnd = () => {
      isDown = false;
    };

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    domElement.addEventListener("touchmove", onTouchMove, { passive: true });
    domElement.addEventListener("touchend", onTouchEnd);

    // Resize Observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // ----------------------------------------------------
    // 9. Main Animation Loop
    // ----------------------------------------------------
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Inertia drag rotation
      mainGroup.rotation.y += velY;
      mainGroup.rotation.x += velX;
      velY *= 0.92;
      velX *= 0.92;

      // Base idle rotation
      crystalCore.rotation.y = elapsed * 0.5;
      crystalCore.rotation.x = elapsed * 0.25;

      cageMesh.rotation.y = -elapsed * 0.35;
      cageMesh.rotation.z = elapsed * 0.2;

      pulseSphere.scale.setScalar(1 + Math.sin(elapsed * 2.5) * 0.04);

      ring1.rotation.z = elapsed * 0.3;
      ring2.rotation.z = -elapsed * 0.35;

      // Orbiting satellites update
      satellites.forEach((sat) => {
        sat.angle += sat.speed * 0.015;
        sat.mesh.position.x = sat.radius * Math.cos(sat.angle);
        sat.mesh.position.z = sat.radius * Math.sin(sat.angle);
        sat.mesh.position.y = Math.sin(sat.angle * 2 + sat.tilt) * 0.6;
      });

      // Swirling Particle System
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += 0.003 + (i % 3) * 0.001;
        const r = particleRadii[i];
        const a = particleAngles[i];
        positions[i * 3] = r * Math.cos(a);
        positions[i * 3 + 2] = r * Math.sin(a);
        positions[i * 3 + 1] = particleY[i] + Math.sin(elapsed + r) * 0.15;
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Floating bobbing motion
      mainGroup.position.y = Math.sin(elapsed * 1.4) * 0.14;

      // Parallax smooth interpolation
      targetRotY = mouseX * 0.5;
      targetRotX = mouseY * 0.5;
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.03;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.03;

      // Scale interpolation on hover
      mainGroup.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.08);

      // Light movement
      cyanLight.position.x = Math.sin(elapsed * 2) * 4;
      cyanLight.position.y = Math.cos(elapsed * 1.5) * 4;

      renderer.render(scene, camera);
    };

    animate();

    // ----------------------------------------------------
    // 10. Cleanup
    // ----------------------------------------------------
    return () => {
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("mouseenter", onMouseEnter);
      domElement.removeEventListener("mouseleave", onMouseLeave);

      domElement.removeEventListener("touchstart", onTouchStart);
      domElement.removeEventListener("touchmove", onTouchMove);
      domElement.removeEventListener("touchend", onTouchEnd);

      resizeObserver.disconnect();
      cancelAnimationFrame(animId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose
      crystalGeo.dispose();
      crystalMat.dispose();
      cageGeo.dispose();
      cageMat.dispose();
      pulseGeo.dispose();
      pulseMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Visual Instruction Badge for Recruiters */}
      <div className="absolute top-2 right-4 z-20 pointer-events-none text-xs font-mono tracking-widest text-blue-300/80 bg-blue-950/40 backdrop-blur-md border border-blue-500/30 px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
        <span>3D INTERACTIVE • DRAG TO ROTATE</span>
      </div>

      <div
        ref={mountRef}
        className={`w-full h-full min-h-[480px] lg:min-h-[550px] flex items-center justify-center transition-cursor duration-200 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      />
    </div>
  );
}
