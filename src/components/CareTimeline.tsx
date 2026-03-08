import { motion } from "framer-motion";
import { Check } from "lucide-react";

const entries = [
  { date: "May 2024", activity: "Hospital Visit Support", skills: ["Healthcare coordination", "Emotional support"] },
  { date: "April 2024", activity: "School Administration", skills: ["Project management", "Communication"] },
  { date: "March 2024", activity: "Family Medical Coordination", skills: ["Healthcare navigation", "Crisis management"] },
];

const CareTimeline = () => {
  return (
    <div className="glass-card p-8">
      <h3 className="text-sm font-semibold mb-6 uppercase tracking-widest text-muted-foreground">Care Timeline</h3>
      <div className="space-y-6">
        {entries.map((entry, i) => (
          <motion.div
            key={entry.date}
            className="flex gap-4"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              {i < entries.length - 1 && <div className="w-px flex-1 bg-border/50 mt-2" />}
            </div>
            <div className="pb-6">
              <p className="text-xs text-muted-foreground mb-1">{entry.date}</p>
              <p className="font-medium text-sm mb-2">{entry.activity}</p>
              <div className="flex flex-wrap gap-1.5">
                {entry.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/80">{s}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareTimeline;
