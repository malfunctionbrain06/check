'use client';

import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
  size: number;
}

export function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 4,
      size: 4 + Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          25% { transform: translateY(-30px) translateX(15px); opacity: 0.8; }
          50% { transform: translateY(-60px) translateX(-10px); opacity: 0.4; }
          75% { transform: translateY(-30px) translateX(20px); opacity: 0.7; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }

        .particle {
          animation: float var(--duration)s ease-in-out var(--delay)s infinite;
        }

        .particle::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(247, 168, 184, 0.8), rgba(201, 123, 164, 0.3));
          animation: pulse-glow var(--duration)s ease-in-out var(--delay)s infinite;
        }
      `}</style>

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle absolute rounded-full"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            '--duration': `${particle.duration}s`,
            '--delay': `${particle.delay}s`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
