import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  depth: number; // 0-1 for parallax
  type: "terracotta" | "sage";
  pulsePhase: number;
  pulseSpeed: number;
}

const PARTICLE_COUNT = 48;
const CONNECTION_DISTANCE = 160;
const MAX_OPACITY = 0.11;

const CareParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const isSage = Math.random() < 0.18;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        radius: 1.5 + Math.random() * 2.5,
        depth: 0.3 + Math.random() * 0.7,
        type: isSage ? "sage" : "terracotta",
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.003 + Math.random() * 0.006,
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (particlesRef.current.length === 0) {
        initParticles(rect.width, rect.height);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let time = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);
      time++;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Update positions
      for (const p of particles) {
        // Parallax drift from mouse
        const parallaxFactor = p.depth * 0.015;
        const mx = (mouse.x - w / 2) * parallaxFactor;
        const my = (mouse.y - h / 2) * parallaxFactor;

        p.x += p.vx;
        p.y += p.vy;
        p.pulsePhase += p.pulseSpeed;

        // Soft wrapping
        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        // Draw particle with parallax offset
        const dx = p.x + mx;
        const dy = p.y + my;
        const pulse = 0.6 + 0.4 * Math.sin(p.pulsePhase);
        const baseOpacity = MAX_OPACITY * p.depth * pulse;

        if (p.type === "sage") {
          // Sage green verification pulse
          const sagePulse = 0.5 + 0.5 * Math.sin(p.pulsePhase * 1.5);
          const sageOpacity = baseOpacity * sagePulse;
          
          // Soft glow
          const glowRadius = p.radius * 6;
          const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, glowRadius);
          glow.addColorStop(0, `rgba(127, 176, 105, ${sageOpacity * 0.5})`);
          glow.addColorStop(1, `rgba(127, 176, 105, 0)`);
          ctx.beginPath();
          ctx.arc(dx, dy, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(dx, dy, p.radius * (1 + sagePulse * 0.3), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(127, 176, 105, ${sageOpacity})`;
          ctx.fill();
        } else {
          // Terracotta particle with soft glow
          const glowRadius = p.radius * 4;
          const glow = ctx.createRadialGradient(dx, dy, 0, dx, dy, glowRadius);
          glow.addColorStop(0, `rgba(230, 126, 118, ${baseOpacity * 0.35})`);
          glow.addColorStop(1, `rgba(230, 126, 118, 0)`);
          ctx.beginPath();
          ctx.arc(dx, dy, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(dx, dy, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(230, 126, 118, ${baseOpacity})`;
          ctx.fill();
        }

        // Draw curved connections
        for (let j = particles.indexOf(p) + 1; j < particles.length; j++) {
          const q = particles[j];
          const qx = q.x + (mouse.x - w / 2) * q.depth * 0.015;
          const qy = q.y + (mouse.y - h / 2) * q.depth * 0.015;
          const dist = Math.hypot(dx - qx, dy - qy);

          if (dist < CONNECTION_DISTANCE) {
            const strength = 1 - dist / CONNECTION_DISTANCE;
            const lineOpacity = strength * MAX_OPACITY * 0.5 * Math.min(p.depth, q.depth);

            // Curved connection line
            const midX = (dx + qx) / 2 + (dy - qy) * 0.15;
            const midY = (dy + qy) / 2 + (qx - dx) * 0.15;

            ctx.beginPath();
            ctx.moveTo(dx, dy);
            ctx.quadraticCurveTo(midX, midY, qx, qy);
            ctx.strokeStyle = `rgba(230, 126, 118, ${lineOpacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
      aria-hidden="true"
    />
  );
};

export default CareParticles;
