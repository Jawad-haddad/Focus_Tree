import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  velocity: { x: number; y: number };
}

interface ParticleEffectProps {
  trigger: boolean;
}

export const ParticleEffect = ({ trigger }: ParticleEffectProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const colors = [
      'hsl(var(--primary))',
      'hsl(var(--accent))',
      'hsl(var(--secondary))',
      'hsl(var(--leaf))',
    ];

    const newParticles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
      id: Date.now() + i,
      x: 50,
      y: 50,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 8,
        y: (Math.random() - 0.5) * 8 - 2,
      },
    }));

    setParticles(newParticles);

    const timeout = setTimeout(() => {
      setParticles([]);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-fade-out"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `translate(${particle.velocity.x * 50}px, ${particle.velocity.y * 50}px)`,
            transition: 'all 2s cubic-bezier(0, 0.5, 0.5, 1)',
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};