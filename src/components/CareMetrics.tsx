import { motion } from "framer-motion";
import { Shield, Activity, Brain } from "lucide-react";

interface CareMetricsProps {
  responsibility?: number;
  consistency?: number;
  complexity?: number;
}

interface MetricCardProps {
  icon: React.ElementType;
  label: string;
  points: number;
  maxPoints: number;
  color: "primary" | "gold" | "verified";
  delay?: number;
}

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary", bar: "bg-primary" },
  gold: { bg: "bg-gold/10", text: "text-gold", bar: "bg-gold" },
  verified: { bg: "bg-verified/10", text: "text-verified", bar: "bg-verified" },
};

const MetricCard = ({ icon: Icon, label, points, maxPoints, color, delay = 0 }: MetricCardProps) => {
  const colors = colorMap[color];
  const percentage = maxPoints > 0 ? Math.min((points / maxPoints) * 100, 100) : 0;

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-2xl ${colors.bg} flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${colors.text}`} />
        </div>
        <div>
          <p className="text-sm font-semibold font-heading">{label}</p>
          <p className={`text-xs ${colors.text} font-medium`}>{points} pts</p>
        </div>
      </div>
      <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${colors.bar}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: "easeOut", delay: delay + 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const CareMetrics = ({
  responsibility = 0,
  consistency = 0,
  complexity = 0,
}: CareMetricsProps) => {
  const metrics = [
    { icon: Shield, label: "Responsibility", points: responsibility, maxPoints: 400, color: "primary" as const },
    { icon: Activity, label: "Consistency", points: consistency, maxPoints: 350, color: "gold" as const },
    { icon: Brain, label: "Care Complexity", points: complexity, maxPoints: 250, color: "verified" as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {metrics.map((m, i) => (
        <MetricCard key={m.label} {...m} delay={i * 0.15} />
      ))}
    </div>
  );
};

export default CareMetrics;
