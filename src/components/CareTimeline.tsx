import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { CareEntry } from "@/hooks/useCareData";
import { format, parseISO } from "date-fns";

interface CareTimelineProps {
  entries?: CareEntry[];
}

const CareTimeline = ({ entries = [] }: CareTimelineProps) => {
  // Show the 5 most recent entries
  const recent = entries.slice(0, 5);

  return (
    <div className="glass-card p-8">
      <h3 className="text-sm font-semibold mb-6 uppercase tracking-widest text-muted-foreground font-heading">
        Care Timeline
      </h3>
      {recent.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          Your care moments will appear here after your first upload.
        </p>
      ) : (
        <div className="space-y-6">
          {recent.map((entry, i) => {
            const formattedDate = (() => {
              try {
                return format(parseISO(entry.date), "MMM yyyy");
              } catch {
                return entry.date;
              }
            })();

            return (
              <motion.div
                key={entry.id}
                className="flex gap-4"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-verified/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-verified" />
                  </div>
                  {i < recent.length - 1 && (
                    <div className="w-px flex-1 bg-border/50 mt-2" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="text-xs text-muted-foreground mb-1">{formattedDate}</p>
                  <p className="font-medium text-sm mb-2">{entry.activity}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {entry.skills.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        className="text-xs px-2 py-0.5 rounded-full bg-verified/10 text-verified"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CareTimeline;
