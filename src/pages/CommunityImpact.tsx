import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Users,
  IndianRupee,
  Clock,
  BadgeCheck,
  MapPin,
  Heart,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ── Animated counter (triggers on scroll) ──
const useScrollCounter = (target: number, duration = 2200) => {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [inView, target, duration]);

  return { value, ref };
};

// ── Impact Counter Card ──
const ImpactCounter = ({
  icon: Icon,
  label,
  target,
  prefix = "",
  color,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  target: number;
  prefix?: string;
  color: "primary" | "gold" | "verified";
  delay: number;
}) => {
  const { value, ref } = useScrollCounter(target);
  const colorMap = {
    primary: { bg: "bg-primary/10", text: "text-primary" },
    gold: { bg: "bg-gold/10", text: "text-gold" },
    verified: { bg: "bg-verified/10", text: "text-verified" },
  };
  const c = colorMap[color];

  return (
    <motion.div
      ref={ref}
      className="glass-card p-8 text-center"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`w-12 h-12 rounded-2xl ${c.bg} flex items-center justify-center mx-auto mb-4`}>
        <Icon className={`w-6 h-6 ${c.text}`} />
      </div>
      <p className={`text-3xl sm:text-4xl font-semibold font-heading ${c.text}`}>
        {prefix}{value.toLocaleString("en-IN")}
      </p>
      <p className="text-sm text-muted-foreground mt-2">{label}</p>
    </motion.div>
  );
};

// ── Caregiver Profile Card ──
const caregivers = [
  { name: "Meera", role: "Elder Caregiver", years: 6, score: 910, city: "Mumbai" },
  { name: "Anita", role: "Special Needs Parent", years: 9, score: 875, city: "Delhi" },
  { name: "Priya", role: "Post-Surgery Support", years: 3, score: 820, city: "Bengaluru" },
  { name: "Kavitha", role: "Multi-Generational Care", years: 12, score: 950, city: "Chennai" },
];

const CaregiverCard = ({
  caregiver,
  delay,
}: {
  caregiver: (typeof caregivers)[0];
  delay: number;
}) => (
  <motion.div
    className="glass-card p-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        {/* Avatar circle with initial */}
        <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-sm font-semibold text-primary font-heading">
            {caregiver.name[0]}
          </span>
        </div>
        <div>
          <p className="font-semibold text-sm font-heading">{caregiver.name}</p>
          <p className="text-xs text-muted-foreground">{caregiver.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-2xl bg-verified/10 border border-verified/20">
        <BadgeCheck className="w-3.5 h-3.5 text-verified" />
        <span className="text-xs font-semibold text-verified font-heading">Verified</span>
      </div>
    </div>

    <div className="flex items-center gap-6 text-xs text-muted-foreground">
      <div>
        <p className="text-foreground font-semibold text-sm font-heading">{caregiver.score}</p>
        <p>CareScore</p>
      </div>
      <div>
        <p className="text-foreground font-semibold text-sm font-heading">{caregiver.years} yrs</p>
        <p>Experience</p>
      </div>
      <div className="flex items-center gap-1">
        <MapPin className="w-3 h-3" />
        <p>{caregiver.city}</p>
      </div>
    </div>
  </motion.div>
);

// ── Community Map Visualization ──
const mapDots = [
  { x: 42, y: 28, size: 6, pulse: true },
  { x: 55, y: 45, size: 8, pulse: true },
  { x: 38, y: 55, size: 5, pulse: false },
  { x: 60, y: 35, size: 7, pulse: true },
  { x: 48, y: 62, size: 5, pulse: false },
  { x: 35, y: 40, size: 4, pulse: false },
  { x: 52, y: 52, size: 6, pulse: true },
  { x: 45, y: 35, size: 4, pulse: false },
  { x: 58, y: 58, size: 5, pulse: false },
  { x: 40, y: 48, size: 3, pulse: false },
];

const CommunityMap = () => (
  <motion.div
    className="glass-card p-8 relative overflow-hidden"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: 0.3 }}
  >
    {/* Subtle ambient glow */}
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-3xl opacity-20"
      style={{ background: "hsl(var(--verified))" }}
    />

    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-6">
        <MapPin className="w-5 h-5 text-primary" />
        <p className="text-sm font-semibold font-heading">Caregiver Community Near You</p>
      </div>

      {/* Abstract map */}
      <div className="relative w-full h-48 rounded-2xl bg-muted/30 border border-border/30 overflow-hidden mb-5">
        {/* India-like outline shape (simplified abstract) */}
        <svg
          viewBox="0 0 100 80"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="xMidYMid meet"
        >
          <path
            d="M42 10 Q50 8 55 12 Q62 16 60 25 Q63 30 62 38 Q65 42 60 50 Q58 55 55 60 Q52 65 48 68 Q44 65 40 60 Q36 55 35 48 Q32 42 34 35 Q33 28 36 22 Q38 15 42 10Z"
            fill="hsl(var(--muted))"
            stroke="hsl(var(--border))"
            strokeWidth="0.5"
            opacity="0.5"
          />
        </svg>

        {/* Caregiver dots */}
        {mapDots.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              width: dot.size,
              height: dot.size,
              background: dot.pulse ? "hsl(var(--verified))" : "hsl(var(--terracotta))",
            }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: dot.pulse ? 0.9 : 0.5, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08 }}
          >
            {dot.pulse && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ background: "hsl(var(--verified))" }}
                animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              />
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-verified animate-pulse" />
        <p className="text-sm text-muted-foreground">
          <span className="text-foreground font-semibold">12 caregivers</span> near your city are
          building their verified portfolios right now.
        </p>
      </div>
    </div>
  </motion.div>
);

// ── Main Section ──
const CommunityImpact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-5 h-5 text-primary" />
              <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-heading">
                A growing movement
              </p>
            </div>
            <h2 className="text-3xl sm:text-4xl font-semibold mb-4 font-heading">
              You Are <span className="text-primary">Not Alone</span>
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Thousands of caregivers are already transforming invisible work into recognized value.
              Every portfolio built strengthens the movement.
            </p>
          </motion.div>

          {/* Impact Counters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            <ImpactCounter
              icon={Users}
              label="Active Caregivers"
              target={23421}
              color="primary"
              delay={0}
            />
            <ImpactCounter
              icon={IndianRupee}
              label="Total Care Value Recognized"
              target={412000000}
              prefix="₹"
              color="gold"
              delay={0.15}
            />
            <ImpactCounter
              icon={Clock}
              label="Care Hours Logged"
              target={342000}
              color="verified"
              delay={0.3}
            />
          </div>

          {/* Recognition Stories */}
          <motion.div
            className="mb-5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-6">
              <BadgeCheck className="w-5 h-5 text-verified" />
              <h3 className="text-xl font-semibold font-heading">Caregivers Leading the Way</h3>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
            {caregivers.map((c, i) => (
              <CaregiverCard key={c.name} caregiver={c} delay={i * 0.1} />
            ))}
          </div>

          {/* Community Map */}
          <CommunityMap />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CommunityImpact;
