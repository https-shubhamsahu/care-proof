import { motion } from "framer-motion";
import { FileCheck, Calculator, ArrowRightLeft, Lock, BadgeCheck, Sparkles } from "lucide-react";

const features = [
  {
    icon: FileCheck,
    title: "Evidence-first verification",
    description: "Not self-reported — we build on real documents and cross-verified signals.",
  },
  {
    icon: Calculator,
    title: "Replacement Cost Valuation",
    description: "We benchmark activities to market wages so numbers mean something to lenders and HR.",
  },
  {
    icon: ArrowRightLeft,
    title: "Transferable skill mapping",
    description: "Caregiving tasks mapped to professional skills you can put on a resume.",
  },
  {
    icon: Lock,
    title: "Privacy-first design",
    description: "Control which documents you share and with whom. Bank-grade encryption.",
  },
  {
    icon: BadgeCheck,
    title: "Shareable badges",
    description: "A compact verification badge your portfolio can display — control who sees full docs.",
  },
  {
    icon: Sparkles,
    title: "Early-access perks",
    description: "Verified badges are limited in the first beta wave to maintain credibility and prevent fraud.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4 font-heading">
            Features that actually <span className="text-verified">matter</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              className="glass-card p-6 group hover:border-primary/20 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <f.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 text-sm font-heading">{f.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
