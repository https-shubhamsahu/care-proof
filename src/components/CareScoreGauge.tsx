import { motion } from "framer-motion";

const CareScoreGauge = ({ score = 420 }: { score?: number }) => {
  const max = 1000;
  const percentage = (score / max) * 100;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="glass-card p-8 flex flex-col items-center glow-sage">
      <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Your Care Impact</p>
      <div className="relative w-36 h-36">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          <circle cx="64" cy="64" r="58" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
          <motion.circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="hsl(var(--sage))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-3xl font-semibold text-gradient-sage"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {score}
          </motion.span>
          <span className="text-xs text-muted-foreground">CareScore</span>
        </div>
      </div>
      <p className="text-xs text-muted-foreground/60 mt-4 text-center max-w-[200px]">
        Your CareScore grows with every documented hour of care.
      </p>
    </div>
  );
};

export default CareScoreGauge;
