"use client";

import React, { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
  onComplete?: () => void;
}

export default function Confetti({ active, onComplete }: ConfettiProps) {
  const [particles, setParticles] = useState<Array<{ id: number; color: string; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    if (active) {
      const colors = ["#ce1126", "#0a3d8f", "#f5a623", "#4ade80", "#ffffff"];
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        color: colors[Math.floor(Math.random() * colors.length)],
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.5}s`,
        duration: `${1 + Math.random()}s`
      }));
      setParticles(newParticles);

      const timer = setTimeout(() => {
        setParticles([]);
        if (onComplete) onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [active, onComplete]);

  if (!active || particles.length === 0) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti-fall {
          animation-name: confettiFall;
          animation-timing-function: linear;
          animation-fill-mode: forwards;
        }
      `}} />
      <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute top-[-10%] w-3 h-3 animate-confetti-fall rounded-sm"
            style={{
              backgroundColor: p.color,
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>
    </>
  );
}
