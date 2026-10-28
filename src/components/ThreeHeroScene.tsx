"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Sparkles, Eye, RefreshCw, Cpu, Orbit, Waves } from "lucide-react";

type SceneMode = "core" | "galaxy" | "matrix";

export default function ThreeHeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState<SceneMode>("core");
  const [isHovered, setIsHovered] = useState(false);
  const [particlesCount, setParticlesCount] = useState(700);
  const modeRef = useRef<SceneMode>("core");

  useEffect(() => {
    modeRef.current = activeMode;
  }, [activeMode]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 650;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020617, 0.0018);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 0, 32);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch (e) {
      console.warn("WebGL not supported", e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Mouse coordinates with smoothing
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isDown: false };
    const shockwaves: { radius: number; maxRadius: number; x: number; y: number; opacity: number }[] = [];

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 3, 60);
    pointLight1.position.set(15, 15, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3b82f6, 3, 60);
    pointLight2.position.set(-15, -15, 10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xa855f7, 2.5, 60);
    pointLight3.position.set(0, 15, -10);
    scene.add(pointLight3);

    // -------------------------------------------------------------
    // 1. CYBER CORE GROUP
    // -------------------------------------------------------------
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Outer wireframe icosahedron
    const icoGeometry = new THREE.IcosahedronGeometry(7.5, 1);
    const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
    const icoLineMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.6,
      linewidth: 1,
    });
    const icoLines = new THREE.LineSegments(icoWireframe, icoLineMaterial);
    coreGroup.add(icoLines);

    // Glowing core mesh
    const innerGeometry = new THREE.OctahedronGeometry(4.2, 2);
    const innerMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      emissive: 0x2563eb,
      emissiveIntensity: 0.6,
      roughness: 0.2,
      metalness: 0.8,
      wireframe: true,
    });
    const innerCore = new THREE.Mesh(innerGeometry, innerMaterial);
    coreGroup.add(innerCore);

    // Inner glowing sphere point light representation
    const nucleusGeom = new THREE.SphereGeometry(1.6, 24, 24);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: false,
    });
    const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
    coreGroup.add(nucleus);

    // Gyroscope Orbit Rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(10.5, 0.08, 16, 100), ringMat1);
    coreGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(12, 0.06, 16, 100), ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 4;
    coreGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(13.5, 0.05, 16, 100), ringMat3);
    ring3.rotation.x = -Math.PI / 4;
    ring3.rotation.y = Math.PI / 3;
    coreGroup.add(ring3);

    // -------------------------------------------------------------
    // 2. PARTICLE CONSTELLATION & PLEXUS
    // -------------------------------------------------------------
    const count = particlesCount;
    const particlePositions = new Float32Array(count * 3);
    const particleVelocities: { x: number; y: number; z: number; originX: number; originY: number; originZ: number }[] = [];
    const particleColors = new Float32Array(count * 3);

    const colorPalette = [
      new THREE.Color(0x38bdf8), // Sky Blue
      new THREE.Color(0x06b6d4), // Cyan
      new THREE.Color(0x3b82f6), // Blue
      new THREE.Color(0xa855f7), // Purple
      new THREE.Color(0x34d399), // Emerald
    ];

    for (let i = 0; i < count; i++) {
      const radius = 9 + Math.random() * 24;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        x: (Math.random() - 0.5) * 0.03,
        y: (Math.random() - 0.5) * 0.03,
        z: (Math.random() - 0.5) * 0.03,
        originX: x,
        originY: y,
        originZ: z,
      });

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    // Circle texture for smooth particles
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.3, "rgba(100,200,255,0.8)");
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // -------------------------------------------------------------
    // 3. PLEXUS CONNECTION LINES
    // -------------------------------------------------------------
    const maxConnections = 250;
    const linePositions = new Float32Array(maxConnections * 6);
    const lineColors = new Float32Array(maxConnections * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });

    const plexusLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(plexusLines);

    // -------------------------------------------------------------
    // 4. MATRIX GRID TERRAIN (Mode 3)
    // -------------------------------------------------------------
    const gridHelper = new THREE.GridHelper(60, 40, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -10;
    gridHelper.visible = false;
    scene.add(gridHelper);

    // -------------------------------------------------------------
    // Mouse and Resize Handlers
    // -------------------------------------------------------------
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 10;
      mouse.targetY = y * 8;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        mouse.targetX = x * 10;
        mouse.targetY = y * 8;
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Trigger shockwave
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      shockwaves.push({
        radius: 0.1,
        maxRadius: 28,
        x: x * 15,
        y: y * 12,
        opacity: 1,
      });

      // Brief acceleration to core
      innerMaterial.emissiveIntensity = 2.0;
      setTimeout(() => {
        innerMaterial.emissiveIntensity = 0.6;
      }, 350);
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 650;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("touchmove", handleTouchMove, { passive: true });
    container.addEventListener("click", handleClick);

    // -------------------------------------------------------------
    // Animation Loop
    // -------------------------------------------------------------
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      camera.position.x = mouse.x * 0.6;
      camera.position.y = mouse.y * 0.6;
      camera.lookAt(0, 0, 0);

      const mode = modeRef.current;

      // Handle visibility based on mode
      if (mode === "core") {
        coreGroup.visible = true;
        gridHelper.visible = false;
        particleMaterial.size = 0.8;
      } else if (mode === "galaxy") {
        coreGroup.visible = false;
        gridHelper.visible = false;
        particleMaterial.size = 1.1;
      } else if (mode === "matrix") {
        coreGroup.visible = false;
        gridHelper.visible = true;
        particleMaterial.size = 0.6;
      }

      // Rotate Cyber Core
      if (coreGroup.visible) {
        icoLines.rotation.x = elapsedTime * 0.2;
        icoLines.rotation.y = elapsedTime * 0.25;

        innerCore.rotation.x = -elapsedTime * 0.3;
        innerCore.rotation.z = elapsedTime * 0.2;

        const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.08;
        nucleus.scale.set(pulse, pulse, pulse);

        ring1.rotation.z = elapsedTime * 0.4;
        ring2.rotation.x += 0.005;
        ring2.rotation.y += 0.007;
        ring3.rotation.z -= 0.006;
      }

      // Move Matrix grid terrain in Mode 3
      if (gridHelper.visible) {
        gridHelper.position.z = (elapsedTime * 4) % 3;
      }

      // Update Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 0.9;
        sw.opacity *= 0.96;
        if (sw.radius > sw.maxRadius || sw.opacity < 0.05) {
          shockwaves.splice(s, 1);
        }
      }

      // Update Particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      let lineIndex = 0;
      const posAttr = lineGeometry.attributes.position.array as Float32Array;
      const colAttr = lineGeometry.attributes.color.array as Float32Array;

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        let px = positions[i3];
        let py = positions[i3 + 1];
        let pz = positions[i3 + 2];
        const vel = particleVelocities[i];

        if (mode === "galaxy") {
          // Swirling vortex math
          const angle = elapsedTime * 0.2 + (i / count) * Math.PI * 4;
          const radius = 6 + (i / count) * 22;
          const spiralY = Math.sin(elapsedTime + i * 0.1) * 3;

          positions[i3] = Math.cos(angle) * radius;
          positions[i3 + 1] = spiralY;
          positions[i3 + 2] = Math.sin(angle) * radius;
        } else {
          // Subtle drifting
          px += vel.x;
          py += vel.y;
          pz += vel.z;

          // Bounds check & return to origin
          const distFromOrigin = Math.sqrt(
            (px - vel.originX) ** 2 + (py - vel.originY) ** 2 + (pz - vel.originZ) ** 2
          );
          if (distFromOrigin > 5) {
            vel.x *= -1;
            vel.y *= -1;
            vel.z *= -1;
          }

          // Mouse ripple / shockwave influence
          for (const sw of shockwaves) {
            const dx = px - sw.x;
            const dy = py - sw.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (Math.abs(dist - sw.radius) < 3) {
              const pushForce = 0.5 * sw.opacity;
              px += (dx / (dist || 1)) * pushForce;
              py += (dy / (dist || 1)) * pushForce;
            }
          }

          positions[i3] = px;
          positions[i3 + 1] = py;
          positions[i3 + 2] = pz;
        }

        // Connect lines between nearby particles for Plexus effect (limit count for 60fps)
        if (mode === "core" && i % 4 === 0 && lineIndex < maxConnections) {
          for (let j = i + 1; j < count; j += 6) {
            if (lineIndex >= maxConnections) break;
            const j3 = j * 3;
            const dx = positions[i3] - positions[j3];
            const dy = positions[i3 + 1] - positions[j3 + 1];
            const dz = positions[i3 + 2] - positions[j3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 5.5) {
              const baseIndex = lineIndex * 6;
              posAttr[baseIndex] = positions[i3];
              posAttr[baseIndex + 1] = positions[i3 + 1];
              posAttr[baseIndex + 2] = positions[i3 + 2];

              posAttr[baseIndex + 3] = positions[j3];
              posAttr[baseIndex + 4] = positions[j3 + 1];
              posAttr[baseIndex + 5] = positions[j3 + 2];

              const alpha = Math.max(0, 1 - distance / 5.5);
              colAttr[baseIndex] = 0.05 * alpha;
              colAttr[baseIndex + 1] = 0.7 * alpha;
              colAttr[baseIndex + 2] = 0.95 * alpha;

              colAttr[baseIndex + 3] = 0.6 * alpha;
              colAttr[baseIndex + 4] = 0.2 * alpha;
              colAttr[baseIndex + 5] = 0.9 * alpha;

              lineIndex++;
            }
          }
        }
      }

      particleGeometry.attributes.position.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);
      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("click", handleClick);
        container.innerHTML = "";
      }
      // Dispose Three.js resources
      icoGeometry.dispose();
      icoWireframe.dispose();
      icoLineMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      nucleusGeom.dispose();
      nucleusMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();
    };
  }, [particlesCount]);

  return (
    <div
      className="relative w-full h-[620px] lg:h-[700px] overflow-hidden rounded-3xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="absolute inset-0 cursor-crosshair z-0" />

      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 right-4 z-20 flex flex-wrap items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-2xl border border-cyan-500/20 shadow-xl">
        <span className="text-[11px] font-semibold text-cyan-400 flex items-center gap-1.5 mr-1 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          3D Mode:
        </span>
        <button
          onClick={() => setActiveMode("core")}
          className={`px-3 py-1 text-xs rounded-xl font-medium transition-all flex items-center gap-1.5 ${
            activeMode === "core"
              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-cyan-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          title="Cyber Core & Plexus Network"
        >
          <Cpu className="w-3 h-3" />
          Core
        </button>
        <button
          onClick={() => setActiveMode("galaxy")}
          className={`px-3 py-1 text-xs rounded-xl font-medium transition-all flex items-center gap-1.5 ${
            activeMode === "galaxy"
              ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md shadow-purple-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          title="Swirling 3D Galaxy"
        >
          <Orbit className="w-3 h-3" />
          Galaxy
        </button>
        <button
          onClick={() => setActiveMode("matrix")}
          className={`px-3 py-1 text-xs rounded-xl font-medium transition-all flex items-center gap-1.5 ${
            activeMode === "matrix"
              ? "bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-md shadow-emerald-500/30"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
          title="Cyber Grid Matrix"
        >
          <Waves className="w-3 h-3" />
          Matrix
        </button>
      </div>

      {/* Interactive Helper Hint */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-2 text-xs text-slate-400/80 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
        <span>Move cursor to tilt 3D universe • Click to trigger shockwave</span>
      </div>
    </div>
  );
}

