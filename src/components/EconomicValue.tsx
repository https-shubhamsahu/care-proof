import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";
import { IndianRupee } from "lucide-react";

const EconomicValue = ({ value = 187500 }: { value?: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;
    const timeout = setTimeout(() => {
      setHasAnimated(true);
      const duration = 2000;
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(eased * value));
        if (progress < 1) requestAnimationFrame(tick);
      };
      tick();
    }, 500);
    return () => clearTimeout(timeout);
  }, [value, hasAnimated]);

  return (
    <div className="glass-card p-8 flex flex-col items-center glow-gold">
      <p className="text-xs text-muted-foreground mb-4 uppercase tracking-widest">Estimated Economic Value</p>
      <div className="flex items-center gap-1">
        <IndianRupee className="w-6 h-6 text-gold" />
        <span className="text-3xl font-semibold text-gradient-gold font-heading">
          {displayValue.toLocaleString("en-IN")}
        </span>
      </div>
      <p className="text-xs text-muted-foreground/60 mt-4 text-center max-w-[240px]">
        Based on India's replacement cost estimate for caregiving work.
      </p>
    </div>
  );
};

export default EconomicValue;
