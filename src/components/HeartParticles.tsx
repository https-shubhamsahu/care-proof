import { motion } from "framer-motion";
import { useEffect, useRef, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  angle: number;
  speed: number;
  opacity: number;
}

const HeartParticles = ({ trigger }: { trigger: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>();

  const spawnParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const newParticles: Particle[] = [];
    for (let i = 0; i < 18; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: cx,
        y: cy,
        size: 6 + Math.random() * 8,
        angle: (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.4,
        speed: 1.2 + Math.random() * 2,
        opacity: 1,
      });
    }
    particlesRef.current = newParticles;
  }, []);

  const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
    ctx.beginPath();
    const topY = y - size / 2;
    ctx.moveTo(x, topY + size / 4);
    ctx.bezierCurveTo(x, topY, x - size / 2, topY, x - size / 2, topY + size / 4);
    ctx.bezierCurveTo(x - size / 2, topY + size / 2, x, topY + size * 0.6, x, topY + size * 0.8);
    ctx.bezierCurveTo(x, topY + size * 0.6, x + size / 2, topY + size / 2, x + size / 2, topY + size / 4);
    ctx.bezierCurveTo(x + size / 2, topY, x, topY, x, topY + size / 4);
    ctx.closePath();
    ctx.fill();
  };

  useEffect(() => {
    if (!trigger) return;
    spawnParticles();

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particlesRef.current.forEach((p) => {
        if (p.opacity <= 0) return;
        alive = true;
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed - 0.3;
        p.opacity -= 0.015;
        p.speed *= 0.985;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.opacity);
        // Soft rose color
        ctx.fillStyle = `hsl(4, 62%, ${68 + (1 - p.opacity) * 15}%)`;
        drawHeart(ctx, p.x, p.y, p.size);
        ctx.restore();
      });
      if (alive) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    animate();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [trigger, spawnParticles]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={300}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
    />
  );
};

export default HeartParticles;
