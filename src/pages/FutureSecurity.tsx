import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  IndianRupee,
  Settings2,
  HeartPulse,
  AlertTriangle,
  Calculator,
  BadgeCheck,
  Download,
  TrendingUp,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Animated counter hook ──
const useAnimatedCounter = (target: number, duration = 2000, delay = 0) => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = Date.now();
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      tick();
    }, delay);
    return () => clearTimeout(timeout);
  }, [target, duration, delay]);
  return value;
};

// ── Value Card ──
const ValueCard = ({
  label,
  value,
  delay,
  size = "normal",
}: {
  label: string;
  value: number;
  delay: number;
  size?: "large" | "normal";
}) => {
  const display = useAnimatedCounter(value, size === "large" ? 2500 : 1800, delay);
  const isLarge = size === "large";

  return (
    <motion.div
      className={`glass-card flex flex-col items-center ${isLarge ? "p-10" : "p-7"}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
    >
      {isLarge && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow:
              "inset 0 0 80px hsl(var(--terracotta) / 0.06), 0 0 60px hsl(var(--terracotta) / 0.08)",
          }}
        />
      )}
      <p className="text-xs text-muted-foreground uppercase tracking-[0.2em] font-heading mb-4 relative z-10">
        {label}
      </p>
      <div className="flex items-center gap-1 relative z-10">
        <IndianRupee className={`${isLarge ? "w-7 h-7" : "w-5 h-5"} text-gold`} />
        <span
          className={`${isLarge ? "text-5xl" : "text-3xl"} font-semibold text-gold font-heading`}
        >
          {display.toLocaleString("en-IN")}
        </span>
      </div>
      {isLarge && (
        <p className="text-xs text-muted-foreground/60 mt-4 text-center max-w-[280px] relative z-10">
          The cumulative economic value of your caregiving, calculated using India's replacement cost
          methodology.
        </p>
      )}
    </motion.div>
  );
};

// ── Skill Bar ──
const skills = [
  { name: "Operations Management", proficiency: 87, icon: Settings2 },
  { name: "Healthcare Logistics", proficiency: 79, icon: HeartPulse },
  { name: "Crisis Coordination", proficiency: 92, icon: AlertTriangle },
  { name: "Household Financial Planning", proficiency: 74, icon: Calculator },
];

const SkillBar = ({
  skill,
  delay,
}: {
  skill: (typeof skills)[0];
  delay: number;
}) => (
  <motion.div
    className="glass-card p-5"
    initial={{ opacity: 0, x: -15 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-2xl bg-primary/10 flex items-center justify-center">
          <skill.icon className="w-4 h-4 text-primary" />
        </div>
        <p className="text-sm font-semibold font-heading">{skill.name}</p>
      </div>
      <span className="text-sm font-semibold text-primary font-heading">{skill.proficiency}%</span>
    </div>
    <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-primary"
        initial={{ width: 0 }}
        animate={{ width: `${skill.proficiency}%` }}
        transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.2 }}
      />
    </div>
  </motion.div>
);

// ── Career Readiness ──
const CareerReadiness = () => (
  <motion.div
    className="glass-card p-8"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
  >
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-2xl bg-verified/10 flex items-center justify-center">
        <Briefcase className="w-5 h-5 text-verified" />
      </div>
      <div>
        <p className="text-sm font-semibold font-heading">Career Re-Entry Readiness</p>
        <p className="text-xs text-muted-foreground">Based on verified skills & tenure</p>
      </div>
    </div>

    <div className="flex items-center gap-4 mb-4">
      <div className="flex-1 h-3 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-verified"
          initial={{ width: 0 }}
          animate={{ width: "85%" }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
        />
      </div>
      <motion.span
        className="text-sm font-semibold text-verified font-heading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Strong
      </motion.span>
    </div>

    <motion.div
      className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-verified/10 border border-verified/20"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.6 }}
    >
      <BadgeCheck className="w-4 h-4 text-verified" />
      <span className="text-xs font-semibold text-verified font-heading">
        Skills verified against professional benchmarks
      </span>
    </motion.div>
  </motion.div>
);

// ── Main Page ──
const FutureSecurity = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-3 font-heading">
              Your future, secured
            </p>
            <h1 className="text-3xl sm:text-4xl font-semibold mb-3 font-heading">
              Your Caregiving <span className="text-primary">Impact</span> &{" "}
              <span className="text-gold">Future Security</span>
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Your caregiving built real professional value. Here's the proof that lenders,
              employers, and policymakers can use.
            </p>
          </motion.div>

          {/* Lifetime value — hero card */}
          <div className="mb-6">
            <ValueCard label="Lifetime Care Contribution" value={1840000} delay={200} size="large" />
          </div>

          {/* Today + Monthly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
            <ValueCard label="Today's Care Value" value={2450} delay={600} />
            <ValueCard label="Monthly Care Value" value={48500} delay={800} />
          </div>

          {/* Transferable Skills */}
          <motion.div
            className="mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-primary" />
              <h2 className="text-xl font-semibold font-heading">Transferable Skills Index</h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} delay={0.5 + i * 0.12} />
            ))}
          </div>

          {/* Career Readiness */}
          <div className="mb-10">
            <CareerReadiness />
          </div>

          {/* Export CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-10 text-base rounded-2xl"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Verified Care Portfolio
            </Button>
            <p className="text-xs text-muted-foreground/50 mt-3">
              Exportable in formats accepted by banks, recruiters, and advocacy bodies
            </p>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FutureSecurity;
