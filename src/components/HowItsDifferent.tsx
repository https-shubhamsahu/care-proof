import { motion } from "framer-motion";
import { ScanSearch, Brain, Calculator, FileCheck, ArrowDown } from "lucide-react";

const pipeline = [
  {
    icon: ScanSearch,
    title: "Harvests real-world signals",
    description: "Medical bills, hospital discharge notes, pharmacy receipts, school calendars, appointment logs.",
    color: "primary",
  },
  {
    icon: Brain,
    title: "Translates them with AI",
    description: "Our engine maps activities to professional equivalents — nursing assistant, household operations, logistics coordinator.",
    color: "gold",
  },
  {
    icon: Calculator,
    title: "Applies the Replacement Cost Method",
    description: "We price those activities using market wages for equivalent professional roles.",
    color: "verified",
  },
  {
    icon: FileCheck,
    title: "Generates a Verified Portfolio",
    description: "A shareable, finance- and HR-ready document with verified responsibilities, impact metrics, and a CareScore.",
    color: "primary",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  gold: { bg: "bg-gold/10", text: "text-gold" },
  verified: { bg: "bg-verified/10", text: "text-verified" },
};

const HowItsDifferent = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-background">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 font-heading">
            Why CareProof is <span className="text-primary">different</span>
          </h2>
          <p className="text-muted-foreground">
            Most apps ask you to track. We don't just track — <span className="text-foreground font-medium">we validate.</span>
          </p>
        </motion.div>

        <div className="space-y-4">
          {pipeline.map((step, i) => {
            const colors = colorMap[step.color];
            return (
              <div key={step.title}>
                <motion.div
                  className="glass-card p-6 flex items-start gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <div className={`w-11 h-11 rounded-2xl ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 font-heading">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
                {i < pipeline.length - 1 && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="w-4 h-4 text-muted-foreground/40" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <motion.p
          className="text-center mt-10 text-lg font-semibold font-heading text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          This isn't a diary. It's a <span className="text-primary">credential.</span>
        </motion.p>
      </div>
    </section>
  );
};

export default HowItsDifferent;
