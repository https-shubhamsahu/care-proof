import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const mappings = [
  { evidence: "Medical bills", care: "Elder care coordination", skill: "Healthcare navigation" },
  { evidence: "School schedules", care: "Childcare logistics", skill: "Project management" },
  { evidence: "Grocery receipts", care: "Household management", skill: "Budgeting" },
  { evidence: "Therapy notes", care: "Emotional labor", skill: "Crisis counseling" },
];

const SkillsMapping = () => {
  return (
    <section className="py-24 px-6 bg-gradient-hero">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            Care is <span className="text-gradient-gold">Professional Work</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            CareProof reframes caregiving as the real leadership and management work it truly is.
          </p>
        </motion.div>

        <div className="space-y-3">
          {mappings.map((m, i) => (
            <motion.div
              key={m.evidence}
              className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 justify-between"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Evidence</p>
                <p className="text-sm font-medium">{m.evidence}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-primary/50 hidden sm:block flex-shrink-0 mx-4" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Care Activity</p>
                <p className="text-sm font-medium text-primary">{m.care}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gold/50 hidden sm:block flex-shrink-0 mx-4" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Professional Skill</p>
                <p className="text-sm font-medium text-gold">{m.skill}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsMapping;
