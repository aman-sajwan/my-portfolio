"use client";

import React, { useState, useRef, MouseEvent } from "react";

interface Card3DTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function Card3DTilt({
  children,
  className = "",
  maxTilt = 8,
  glare = true,
}: Card3DTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = x / rect.width;
    const yPercent = y / rect.height;

    const tiltX = (yPercent - 0.5) * -maxTilt;
    const tiltY = (xPercent - 0.5) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
    setGlarePos({
      x: xPercent * 100,
      y: yPercent * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
        transformStyle: "preserve-3d",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl transition-opacity duration-300 z-30 overflow-hidden"
          style={{
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(56, 189, 248, ${glarePos.opacity}), transparent 60%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}

