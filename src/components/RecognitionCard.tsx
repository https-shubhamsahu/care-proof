import { motion } from "framer-motion";
import { BadgeCheck, Sparkles } from "lucide-react";

interface RecognitionCardProps {
  totalEntries?: number;
  totalHours?: number;
}

const RecognitionCard = ({ totalEntries = 0, totalHours = 0 }: RecognitionCardProps) => {
  const getHeadline = () => {
    if (totalEntries === 0) return "You're just getting started.";
    if (totalHours < 10) return `You've logged ${totalEntries} caregiving moment${totalEntries !== 1 ? "s" : ""}.`;
    if (totalHours < 50) return `You've dedicated ${totalHours} hours to caregiving.`;
    return `You managed ${totalEntries} caregiving responsibilities.`;
  };

  const getSubtext = () => {
    if (totalEntries === 0)
      return "Upload your first piece of care evidence to start building your verified portfolio.";
    if (totalHours < 10)
      return "Every entry you add strengthens your verified CareScore and economic record. Keep going.";
    return "That level of coordination matches professional care managers. Your ability to navigate complex, overlapping demands demonstrates leadership that most systems fail to measure — but we see it.";
  };

  return (
    <motion.div
      className="glass-card p-8 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      {/* Ambient glow */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-30"
        style={{ background: "hsl(var(--verified))" }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-gold" />
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground font-heading">
            Today's Recognition
          </p>
        </div>

        <p className="text-lg leading-relaxed text-foreground mb-2 font-heading">
          <span className="text-primary font-semibold">{getHeadline()}</span>
        </p>
        <p className="text-muted-foreground leading-relaxed mb-6">{getSubtext()}</p>

        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-verified/10 border border-verified/20"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.4 }}
        >
          <BadgeCheck className="w-4 h-4 text-verified" />
          <span className="text-sm font-semibold text-verified font-heading">Verified Impact</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecognitionCard;
