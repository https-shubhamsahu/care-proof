import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const affirmations = [
  "The time you spend caring for others is never wasted — it builds strength the world doesn't always see.",
  "Every act of care is a quiet revolution against a world that forgets to notice.",
  "You are someone's anchor. That is not small work — it is everything.",
  "Caregiving is leadership in its most compassionate form.",
  "The patience you show today is shaping someone's tomorrow.",
  "Your invisible labor holds families together. We see you.",
  "Rest is not giving up. It's how caregivers keep going.",
  "What you do at home would take a team of professionals to replicate.",
  "Behind every 'How are you?' you ask, there's a world of empathy the world needs more of.",
  "You don't need a title to be a leader. You already are one.",
];

interface AffirmationCardProps {
  totalEntries?: number;
  totalHours?: number;
}

const AffirmationCard = ({ totalEntries = 0, totalHours = 0 }: AffirmationCardProps) => {
  const [affirmation, setAffirmation] = useState("");

  useEffect(() => {
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    setAffirmation(affirmations[dayOfYear % affirmations.length]);
  }, []);

  return (
    <motion.div
      className="glass-card p-5 mb-6 flex items-start gap-4 glow-primary"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1.5 gap-2 flex-wrap">
          <p className="text-xs font-medium text-primary uppercase tracking-widest font-heading flex items-center gap-1.5">
            <Heart className="w-3 h-3" />
            Note of the Day
          </p>
          {totalEntries > 0 && (
            <p className="text-xs text-muted-foreground">
              <span className="text-foreground font-semibold">{totalEntries}</span> moments logged ·{" "}
              <span className="text-foreground font-semibold">{totalHours}</span> hrs of care
            </p>
          )}
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed italic">
          "{affirmation}"
        </p>
      </div>
    </motion.div>
  );
};

export default AffirmationCard;
