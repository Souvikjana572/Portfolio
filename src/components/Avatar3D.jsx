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

    // Scene & Camera
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 6.5);

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
    // 0. Procedural Code Terminal Texture for Laptop Screen
    // ----------------------------------------------------
    const canvasTex = document.createElement("canvas");
    canvasTex.width = 1024;
    canvasTex.height = 640;
    const ctx = canvasTex.getContext("2d");

    const renderTerminalTexture = () => {
      // Dark Terminal background
      ctx.fillStyle = "#090d16";
      ctx.fillRect(0, 0, canvasTex.width, canvasTex.height);

      // Terminal Header bar
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(0, 0, canvasTex.width, 48);

      // Window control buttons (red, yellow, green)
      ctx.fillStyle = "#ef4444";
      ctx.beginPath();
      ctx.arc(30, 24, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(54, 24, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(78, 24, 8, 0, Math.PI * 2);
      ctx.fill();

      // Title
      ctx.fillStyle = "#94a3b8";
      ctx.font = "bold 20px monospace";
      ctx.fillText("souvik@dev-workstation: ~/portfolio", 110, 31);

      // Code Lines
      const codeLines = [
        { text: "const developer = new SoftwareEngineer({", color: "#60a5fa" },
        { text: '  name: "Souvik Jana",', color: "#f472b6" },
        { text: '  role: "Full Stack & Systems Engineer",', color: "#34d399" },
        { text: '  skills: ["React", "Node.js", "C++", "Cloud", "AI"],', color: "#c084fc" },
        { text: "});", color: "#60a5fa" },
        { text: "", color: "" },
        { text: "async function deployAwesomeProject() {", color: "#fbbf24" },
        { text: "  await developer.buildScalableSystems();", color: "#38bdf8" },
        { text: '  console.log("🚀 System Deployed Successfully!");', color: "#4ade80" },
        { text: "}", color: "#fbbf24" },
        { text: "", color: "" },
        { text: "// Status: Active & Ready for New Challenges", color: "#64748b" },
        { text: "developer.solveComplexProblems(); ▌", color: "#38bdf8" },
      ];

      let yPos = 95;
      ctx.font = "bold 24px monospace";
      codeLines.forEach((line) => {
        if (line.text) {
          ctx.fillStyle = line.color;
          ctx.fillText(line.text, 40, yPos);
        }
        yPos += 38;
      });
    };

    renderTerminalTexture();
    const screenTexture = new THREE.CanvasTexture(canvasTex);

    // ----------------------------------------------------
    // 1. 3D Cybernetic Laptop Workstation
    // ----------------------------------------------------
    const laptopGroup = new THREE.Group();
    mainGroup.add(laptopGroup);

    // 1a. Base Chassis
    const baseGeo = new THREE.BoxGeometry(3.4, 0.14, 2.3);
    const baseMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.5;
    laptopGroup.add(baseMesh);

    // 1b. Keyboard Area & Backlit Keycap Grid
    const kbGeo = new THREE.BoxGeometry(3.0, 0.04, 1.4);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.35,
      roughness: 0.4,
      metalness: 0.6,
    });
    const kbMesh = new THREE.Mesh(kbGeo, kbMat);
    kbMesh.position.set(0, -0.42, -0.2);
    laptopGroup.add(kbMesh);

    // Glowing Keycap Accent Lines
    const kbLinesGeo = new THREE.PlaneGeometry(2.9, 1.3);
    const kbLinesMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
    });
    const kbLines = new THREE.Mesh(kbLinesGeo, kbLinesMat);
    kbLines.rotation.x = -Math.PI / 2;
    kbLines.position.set(0, -0.39, -0.2);
    laptopGroup.add(kbLines);

    // 1c. Trackpad
    const padGeo = new THREE.BoxGeometry(0.9, 0.02, 0.6);
    const padMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2,
      roughness: 0.2,
    });
    const padMesh = new THREE.Mesh(padGeo, padMat);
    padMesh.position.set(0, -0.42, 0.7);
    laptopGroup.add(padMesh);

    // 1d. Screen Lid Assembly
    const screenLidGroup = new THREE.Group();
    screenLidGroup.position.set(0, -0.43, -1.1); // Hinge location
    screenLidGroup.rotation.x = -Math.PI / 9; // ~110 degrees open
    laptopGroup.add(screenLidGroup);

    // Outer Back Lid
    const lidBackGeo = new THREE.BoxGeometry(3.4, 2.2, 0.08);
    const lidBackMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
    });
    const lidBackMesh = new THREE.Mesh(lidBackGeo, lidBackMat);
    lidBackMesh.position.set(0, 1.1, 0);
    screenLidGroup.add(lidBackMesh);

    // Glowing Souvik Jana / Developer Logo on Back of Lid
    const logoGeo = new THREE.RingGeometry(0.2, 0.35, 32);
    const logoMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
    });
    const logoMesh = new THREE.Mesh(logoGeo, logoMat);
    logoMesh.position.set(0, 1.1, -0.05);
    screenLidGroup.add(logoMesh);

    // Front Display Bezel & Screen
    const screenGeo = new THREE.PlaneGeometry(3.15, 1.95);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 1.1, 0.045);
    screenLidGroup.add(screenMesh);

    // Terminal Screen Light Beam Emission
    const screenLight = new THREE.PointLight(0x38bdf8, 3.5, 6);
    screenLight.position.set(0, 1.1, 0.5);
    screenLidGroup.add(screenLight);

    // ----------------------------------------------------
    // 2. 3D Floating Programming Code Symbols (`</>`, `{ }`, `=>`)
    // ----------------------------------------------------
    const codeSymbolsGroup = new THREE.Group();
    mainGroup.add(codeSymbolsGroup);

    // Helper to build 3D Bracket geometry shapes
    const createBracketSymbol = (type, color) => {
      const group = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.8,
      });

      if (type === "</>") {
        // Left Angle `<`
        const arm1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.08), mat);
        arm1.rotation.z = Math.PI / 4;
        arm1.position.set(-0.35, 0.12, 0);

        const arm2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.08), mat);
        arm2.rotation.z = -Math.PI / 4;
        arm2.position.set(-0.35, -0.12, 0);

        // Slash `/`
        const slash = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.08, 0.08), mat);
        slash.rotation.z = Math.PI / 3;

        // Right Angle `>`
        const arm3 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.08), mat);
        arm3.rotation.z = -Math.PI / 4;
        arm3.position.set(0.35, 0.12, 0);

        const arm4 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.08, 0.08), mat);
        arm4.rotation.z = Math.PI / 4;
        arm4.position.set(0.35, -0.12, 0);

        group.add(arm1, arm2, slash, arm3, arm4);
      } else if (type === "{}") {
        // Curly Brace `{}` representation
        const b1 = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 12, 32, Math.PI), mat);
        b1.position.x = -0.2;
        const b2 = new THREE.Mesh(new THREE.TorusGeometry(0.25, 0.04, 12, 32, Math.PI), mat);
        b2.rotation.z = Math.PI;
        b2.position.x = 0.2;
        group.add(b1, b2);
      } else if (type === "=>") {
        // Arrow operator `=>`
        const line1 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.07, 0.07), mat);
        line1.position.set(-0.15, 0.07, 0);

        const line2 = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.07, 0.07), mat);
        line2.position.set(-0.15, -0.07, 0);

        const tip1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.07, 0.07), mat);
        tip1.rotation.z = -Math.PI / 4;
        tip1.position.set(0.12, 0.08, 0);

        const tip2 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.07, 0.07), mat);
        tip2.rotation.z = Math.PI / 4;
        tip2.position.set(0.12, -0.08, 0);

        group.add(line1, line2, tip1, tip2);
      }

      return group;
    };

    // Instantiate Symbols orbiting around workstation
    const sym1 = createBracketSymbol("</>", 0x38bdf8); // Cyan Code Bracket
    sym1.position.set(-2.2, 0.8, 1.0);
    sym1.scale.setScalar(0.95);
    codeSymbolsGroup.add(sym1);

    const sym2 = createBracketSymbol("{}", 0xc084fc); // Purple Curly Braces
    sym2.position.set(2.3, 1.2, -0.5);
    sym2.scale.setScalar(1.1);
    codeSymbolsGroup.add(sym2);

    const sym3 = createBracketSymbol("=>", 0x34d399); // Green Arrow Operator
    sym3.position.set(-2.0, -0.2, -1.2);
    sym3.scale.setScalar(0.9);
    codeSymbolsGroup.add(sym3);

    // ----------------------------------------------------
    // 3. Orbiting Data & Cloud Satellite Cubes
    // ----------------------------------------------------
    const satGroup = new THREE.Group();
    mainGroup.add(satGroup);

    const satNodes = [];
    const nodeColors = [0x60a5fa, 0xa855f7, 0x34d399, 0xf472b6];
    const nodeRadii = [2.4, 2.8, 3.1, 3.5];
    const nodeSpeeds = [0.8, -0.7, 0.9, -0.6];

    for (let i = 0; i < 4; i++) {
      const nodeGeo = new THREE.BoxGeometry(0.25, 0.25, 0.25);
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[i],
        emissive: nodeColors[i],
        emissiveIntensity: 0.8,
        wireframe: i % 2 === 0,
        metalness: 0.8,
        roughness: 0.2,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);

      satNodes.push({
        mesh: nodeMesh,
        radius: nodeRadii[i],
        speed: nodeSpeeds[i],
        angle: (i * Math.PI) / 2,
        tilt: (i * Math.PI) / 4,
      });

      satGroup.add(nodeMesh);
    }

    // ----------------------------------------------------
    // 4. Binary Code Particle Stream
    // ----------------------------------------------------
    const particleCount = 260;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleVelY = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePos[i * 3] = (Math.random() - 0.5) * 5.0;
      particlePos[i * 3 + 1] = (Math.random() - 0.5) * 4.0;
      particlePos[i * 3 + 2] = (Math.random() - 0.5) * 5.0;
      particleVelY[i] = 0.008 + Math.random() * 0.015;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x60a5fa,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particleSystem);

    // ----------------------------------------------------
    // 5. Lighting Setup
    // ----------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x3b82f6, 4, 12);
    blueLight.position.set(5, 5, 5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xa855f7, 4, 12);
    purpleLight.position.set(-5, -4, 4);
    scene.add(purpleLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 3, 10);
    cyanLight.position.set(0, 2, 5);
    scene.add(cyanLight);

    // ----------------------------------------------------
    // 6. Mouse & Drag Interaction
    // ----------------------------------------------------
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

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

      mouseX = (x / rect.width - 0.5) * 1.5;
      mouseY = (y / rect.height - 0.5) * 1.5;

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

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    // Touch events for drag interaction
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
    // 7. Main Animation Loop
    // ----------------------------------------------------
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Drag inertia rotation
      mainGroup.rotation.y += velY;
      mainGroup.rotation.x += velX;
      velY *= 0.92;
      velX *= 0.92;

      // Gentle floating bob for workstation
      laptopGroup.position.y = Math.sin(elapsed * 1.5) * 0.12;

      // Floating & rotating programming symbols
      sym1.rotation.y = elapsed * 0.8;
      sym1.rotation.x = Math.sin(elapsed) * 0.3;
      sym1.position.y = 0.8 + Math.sin(elapsed * 1.8) * 0.15;

      sym2.rotation.y = -elapsed * 0.7;
      sym2.rotation.z = Math.cos(elapsed) * 0.3;
      sym2.position.y = 1.2 + Math.cos(elapsed * 1.5) * 0.15;

      sym3.rotation.y = elapsed * 0.9;
      sym3.position.y = -0.2 + Math.sin(elapsed * 2.0) * 0.12;

      // Satellite Nodes orbiting
      satNodes.forEach((node) => {
        node.angle += node.speed * 0.015;
        node.mesh.position.x = node.radius * Math.cos(node.angle);
        node.mesh.position.z = node.radius * Math.sin(node.angle);
        node.mesh.position.y = Math.sin(node.angle * 2 + node.tilt) * 0.7;
        node.mesh.rotation.y = elapsed;
        node.mesh.rotation.x = elapsed * 0.5;
      });

      // Binary particle stream rising
      const pos = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        pos[i * 3 + 1] += particleVelY[i];
        if (pos[i * 3 + 1] > 2.5) {
          pos[i * 3 + 1] = -2.5;
          pos[i * 3] = (Math.random() - 0.5) * 5.0;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 5.0;
        }
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;

      // Parallax smooth mouse tilt
      targetRotY = mouseX * 0.45;
      targetRotX = mouseY * 0.35;
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.03;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.03;

      // Light animation
      cyanLight.position.x = Math.sin(elapsed * 1.8) * 3;

      renderer.render(scene, camera);
    };

    animate();

    // ----------------------------------------------------
    // 8. Cleanup
    // ----------------------------------------------------
    return () => {
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      domElement.removeEventListener("touchstart", onTouchStart);
      domElement.removeEventListener("touchmove", onTouchMove);
      domElement.removeEventListener("touchend", onTouchEnd);

      resizeObserver.disconnect();
      cancelAnimationFrame(animId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      // Dispose resources
      baseGeo.dispose();
      baseMat.dispose();
      kbGeo.dispose();
      kbMat.dispose();
      kbLinesGeo.dispose();
      kbLinesMat.dispose();
      padGeo.dispose();
      padMat.dispose();
      lidBackGeo.dispose();
      lidBackMat.dispose();
      logoGeo.dispose();
      logoMat.dispose();
      screenGeo.dispose();
      screenMat.dispose();
      screenTexture.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none">
      {/* Visual Instruction Badge */}


      <div
        ref={mountRef}
        className={`w-full h-full min-h-[480px] lg:min-h-[550px] flex items-center justify-center transition-cursor duration-200 ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
      />
    </div>
  );
}
