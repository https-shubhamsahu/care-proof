import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const CareScoreGauge = ({ score = 842 }: { score?: number }) => {
  const max = 1000;
  const percentage = (score / max) * 100;
  const circumference = 2 * Math.PI * 62;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const [displayScore, setDisplayScore] = useState(0);
  const [showPulse, setShowPulse] = useState(false);
  const prevScore = useRef(0);

  useEffect(() => {
    const duration = 2000;
    const start = Date.now();
    const startVal = prevScore.current;
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + eased * (score - startVal));
      setDisplayScore(current);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        prevScore.current = score;
        // Trigger verified pulse on completion
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 1500);
      }
    };
    tick();
  }, [score]);

  return (
    <div className="glass-card p-10 flex flex-col items-center relative overflow-hidden">
      {/* Sage green pulse on score increase */}
      {showPulse && (
        <motion.div
          className="absolute inset-0 rounded-2xl"
          initial={{ opacity: 0.25 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            boxShadow: "inset 0 0 60px hsl(var(--verified) / 0.3), 0 0 40px hsl(var(--verified) / 0.15)",
          }}
        />
      )}

      <p className="text-xs text-muted-foreground mb-6 uppercase tracking-[0.2em] font-heading">
        Your CareScore
      </p>

      <motion.div
        className="relative w-48 h-48"
        animate={{ scale: [1, 1.01, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Terracotta glow behind gauge */}
        <div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, hsl(var(--terracotta) / 0.15) 0%, transparent 70%)`,
          }}
        />

        <svg className="w-full h-full -rotate-90 relative z-10" viewBox="0 0 140 140">
          {/* Track */}
          <circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {/* Progress */}
          <motion.circle
            cx="70"
            cy="70"
            r="62"
            fill="none"
            stroke="hsl(var(--terracotta))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <motion.span
            className="text-5xl font-semibold text-primary font-heading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            {displayScore}
          </motion.span>
          <span className="text-xs text-muted-foreground mt-1">/ {max}</span>
        </div>
      </motion.div>

      <motion.p
        className="text-sm text-muted-foreground/70 mt-6 text-center max-w-[260px] leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Your CareScore reflects the depth and consistency of your caregiving journey.
      </motion.p>
    </div>
  );
};

export default CareScoreGauge;
