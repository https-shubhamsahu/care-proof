import { motion } from "framer-motion";
import { Lightbulb, AlertTriangle } from "lucide-react";

const ImagineThis = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30">
      <div className="container mx-auto max-w-3xl space-y-12 sm:space-y-20">
        {/* Hook — imagine this */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-verified/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-verified" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold font-heading">Imagine this</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
            You walk into a bank or a hiring manager's office and hand them a document that proves the last five years of your life weren't "time off." They see months of verified crisis management, logistical oversight, financial stewardship, and people leadership — not excuses. They see <span className="text-foreground font-medium">measurable value</span>. That changes decisions. That's CareProof.
          </p>
        </motion.div>

        {/* The problem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold font-heading">The problem — short, brutal truth</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            Most systems reward visible, paid work. Caregiving leaves digital breadcrumbs — medical receipts, school messages, appointment logs — but there's no credible bridge to convert those breadcrumbs into professional evidence. So caregivers lose out on promotions, loans, pensions, and respect.
          </p>
          <p className="text-foreground font-medium mt-4">
            That's not a moral issue — it's an information problem. CareProof fixes the information problem.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ImagineThis;
