"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { skillClouds } from "../data/portfolioData";
import { Sparkles, Layers, Rotate3d, CheckCircle2 } from "lucide-react";

interface NodePoint {
  name: string;
  category: string;
  level: number;
  position: THREE.Vector3;
  color: string;
}

export default function ThreeSkillGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    category: string;
    level: number;
  } | null>(skillClouds[0]);
  const [projectedPoints, setProjectedPoints] = useState<
    { name: string; category: string; level: number; x: number; y: number; z: number; scale: number; opacity: number }[]
  >([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 28;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (e) {
      console.warn("WebGL not supported for skill globe", e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Skill Globe Group
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Inner wireframe sphere
    const sphereRadius = 11;
    const wireframeGeom = new THREE.SphereGeometry(sphereRadius, 18, 18);
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x1e3a8a,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeom, wireframeMat);
    globeGroup.add(wireframeMesh);

    // Equator / Orbit Ring
    const orbitGeom = new THREE.RingGeometry(sphereRadius + 1.5, sphereRadius + 1.7, 64);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing = new THREE.Mesh(orbitGeom, orbitMat);
    orbitRing.rotation.x = Math.PI / 2;
    globeGroup.add(orbitRing);

    // Fibonacci Sphere Distribution of Skill Nodes
    const nodePoints: NodePoint[] = [];
    const total = skillClouds.length;
    const phiAngle = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    const categoryColors: Record<string, string> = {
      Frontend: "#38bdf8",
      Backend: "#34d399",
      Language: "#fbbf24",
      "AI & Data": "#c084fc",
      DevOps: "#f472b6",
      Cloud: "#60a5fa",
      Database: "#a3e635",
      Security: "#f87171",
      "CI/CD": "#2dd4bf",
      Enterprise: "#818cf8",
      Styling: "#ec4899",
    };

    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2; // y goes from 1 to -1
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phiAngle * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const vec = new THREE.Vector3(x * sphereRadius, y * sphereRadius, z * sphereRadius);
      const skill = skillClouds[i];

      nodePoints.push({
        name: skill.name,
        category: skill.category,
        level: skill.level,
        position: vec,
        color: categoryColors[skill.category] || "#38bdf8",
      });

      // Point marker
      const dotGeom = new THREE.SphereGeometry(0.35, 12, 12);
      const dotMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(categoryColors[skill.category] || "#38bdf8"),
      });
      const dot = new THREE.Mesh(dotGeom, dotMat);
      dot.position.copy(vec);
      globeGroup.add(dot);
    }

    // Connect some lines between points
    const linesGeom = new THREE.BufferGeometry();
    const lineCoords: number[] = [];
    for (let i = 0; i < nodePoints.length; i++) {
      for (let j = i + 1; j < nodePoints.length; j++) {
        const d = nodePoints[i].position.distanceTo(nodePoints[j].position);
        if (d < 7.5) {
          lineCoords.push(
            nodePoints[i].position.x,
            nodePoints[i].position.y,
            nodePoints[i].position.z,
            nodePoints[j].position.x,
            nodePoints[j].position.y,
            nodePoints[j].position.z
          );
        }
      }
    }
    linesGeom.setAttribute("position", new THREE.Float32BufferAttribute(lineCoords, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x0ea5e9,
      transparent: true,
      opacity: 0.25,
    });
    const constellationLines = new THREE.LineSegments(linesGeom, linesMat);
    globeGroup.add(constellationLines);

    // Mouse drag interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let rotationVelocity = { x: 0.003, y: 0.005 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;

      rotationVelocity.y = deltaX * 0.005;
      rotationVelocity.x = deltaY * 0.005;

      globeGroup.rotation.y += rotationVelocity.y;
      globeGroup.rotation.x += rotationVelocity.x;

      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;

      rotationVelocity.y = deltaX * 0.005;
      rotationVelocity.x = deltaY * 0.005;

      globeGroup.rotation.y += rotationVelocity.y;
      globeGroup.rotation.x += rotationVelocity.x;

      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseUp);
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    let tempVector = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Inertia damping and default slow spin
        rotationVelocity.y += (0.003 - rotationVelocity.y) * 0.05;
        rotationVelocity.x += (0.001 - rotationVelocity.x) * 0.05;
        globeGroup.rotation.y += rotationVelocity.y;
        globeGroup.rotation.x += rotationVelocity.x;
      }

      orbitRing.rotation.z += 0.004;

      // Calculate projected 2D coordinates for UI badges
      const projected = nodePoints.map((node) => {
        tempVector.copy(node.position);
        tempVector.applyMatrix4(globeGroup.matrixWorld);

        const zDepth = tempVector.z; // Closer when z is higher
        tempVector.project(camera);

        const x2D = ((tempVector.x + 1) * width) / 2;
        const y2D = ((-tempVector.y + 1) * height) / 2;

        const normalizedZ = (zDepth + sphereRadius) / (2 * sphereRadius);
        const scale = 0.65 + Math.max(0, normalizedZ) * 0.55;
        const opacity = 0.2 + Math.max(0, normalizedZ) * 0.8;

        return {
          name: node.name,
          category: node.category,
          level: node.level,
          x: x2D,
          y: y2D,
          z: zDepth,
          scale,
          opacity: Math.min(1, Math.max(0.15, opacity)),
        };
      });

      setProjectedPoints(projected);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseUp);
      window.removeEventListener("resize", handleResize);
      if (container) {
        container.removeEventListener("mousedown", onMouseDown);
        container.removeEventListener("touchstart", onTouchStart);
        container.innerHTML = "";
      }
      wireframeGeom.dispose();
      wireframeMat.dispose();
      orbitGeom.dispose();
      orbitMat.dispose();
      linesGeom.dispose();
      linesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full rounded-3xl bg-slate-900/40 border border-slate-800 p-6 backdrop-blur-xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-2">
            <Rotate3d className="w-3.5 h-3.5" />
            Interactive 3D Skill Constellation
          </div>
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            Orbital Tech Universe
          </h3>
          <p className="text-sm text-slate-400">
            Drag to rotate sphere in 3D • Click any skill node to inspect
          </p>
        </div>

        {selectedSkill && (
          <div className="bg-slate-950/80 border border-cyan-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-lg shadow-cyan-500/10">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {selectedSkill.category}
              </div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                {selectedSkill.name}
                <span className="text-xs text-cyan-400 font-mono">
                  {selectedSkill.level}%
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-radial from-slate-900/60 to-slate-950 flex items-center justify-center select-none">
        {/* Three.js Canvas */}
        <div
          ref={mountRef}
          className="absolute inset-0 cursor-grab active:cursor-grabbing"
        />

        {/* 2D Projection Overlay Badges */}
        <div className="absolute inset-0 pointer-events-none">
          {projectedPoints.map((point) => {
            const isSelected = selectedSkill?.name === point.name;
            const isFrontFacing = point.z > -4;

            return (
              <button
                key={point.name}
                onClick={() =>
                  setSelectedSkill({
                    name: point.name,
                    category: point.category,
                    level: point.level,
                  })
                }
                style={{
                  transform: `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%) scale(${point.scale})`,
                  opacity: point.opacity,
                  zIndex: Math.round(point.z + 50),
                }}
                className={`absolute pointer-events-auto transition-all duration-150 rounded-xl px-2.5 py-1 text-xs font-semibold whitespace-nowrap border shadow-lg flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-cyan-500 text-black border-white ring-4 ring-cyan-400/40 shadow-cyan-500/50"
                    : isFrontFacing
                    ? "bg-slate-900/90 hover:bg-cyan-950 text-slate-100 hover:text-cyan-300 border-cyan-500/30 hover:border-cyan-400"
                    : "bg-slate-950/60 text-slate-400 border-slate-800"
                }`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isSelected ? "bg-black" : "bg-cyan-400"
                  }`}
                />
                {point.name}
              </button>
            );
          })}
        </div>

        {/* Bottom controls tip */}
        <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800 pointer-events-none">
          3D Perspective Fibonacci Sphere
        </div>
      </div>
    </div>
  );
}

