import { motion } from "framer-motion";
import { ShieldCheck, Quote, FileText } from "lucide-react";

const portfolioBullets = [
  "Managed monthly household budget of INR 45,000, negotiating bulk purchases and reducing monthly spend by 18%.",
  "Coordinated post-operative care for family member: medication scheduling, wound-care logistics, daily physiotherapy scheduling, direct liaising with hospital staff and visiting specialists. (Verified: medical bills, discharge notes.)",
  "Operated crisis communication chain: acted as point-of-contact for five external stakeholders (doctors, school, employer, social worker, extended family) during emergency episodes.",
  "Built a weekly schedule for four dependents across school, therapy, and medical appointments, boosting attendance and reducing missed sessions by 35%.",
];

const TrustSection = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-3xl space-y-20">
        {/* Trust & credibility */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-verified/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-verified" />
            </div>
            <h2 className="text-2xl font-semibold font-heading">Trust & credibility</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You should be skeptical. So are we — that's why CareProof combines automated checks with optional manual verification for high-value claims. We use market wage sources and transparent methodology (Replacement Cost Method) so valuations are defensible.
          </p>
          <p className="text-foreground font-medium">
            We never sell your data. You control verification and sharing.
          </p>
        </motion.div>

        {/* Example portfolio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="text-2xl font-semibold font-heading">Example portfolio bullets</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-6">How this looks to an employer or lender:</p>
          <div className="space-y-3">
            {portfolioBullets.map((bullet, i) => (
              <motion.div
                key={i}
                className="glass-card p-5 text-sm text-muted-foreground leading-relaxed border-l-4 border-l-gold/40"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                {bullet}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card p-8"
        >
          <Quote className="w-8 h-8 text-primary/30 mb-4" />
          <p className="text-lg italic text-muted-foreground leading-relaxed mb-4">
            "For the first time, I had a document that turned my daily labor into something lenders could see — I got approved for a small business loan."
          </p>
          <p className="text-xs text-muted-foreground/60">— Early user (composite quote)</p>
          <p className="text-xs text-muted-foreground/50 mt-4">
            We'll publish real testimonials from verified users as soon as they consent. Our early pilots are with family caregivers and community health groups. We prioritize privacy and verified consent.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
