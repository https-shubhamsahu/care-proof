import { motion } from "framer-motion";
import { Gauge, IndianRupee, FileText, Rocket } from "lucide-react";

const outcomes = [
  {
    icon: Gauge,
    title: "CareScore (0–1000)",
    description: "One metric that captures responsibility, complexity, and consistency. Recruiters and micro-lenders get one glance and understand the weight of your caregiving tenure.",
    color: "primary",
  },
  {
    icon: IndianRupee,
    title: "Economic Impact Counter",
    description: "A live INR valuation of the care you've provided — daily, monthly, and cumulative. Tangible numbers change conversations.",
    color: "gold",
  },
  {
    icon: FileText,
    title: "Verified Caregiving Portfolio",
    description: "A professional, exportable document that replaces \"career gap\" with \"verified caregiving tenure\" — with bulletized, transferable skills.",
    color: "verified",
  },
  {
    icon: Rocket,
    title: "Actionable Deliverables",
    description: "Bank-ready proof for loans, recruiter-ready portfolios for re-entry, policy-ready data for advocacy.",
    color: "primary",
  },
];

const colorMap: Record<string, { bg: string; text: string }> = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  gold: { bg: "bg-gold/10", text: "text-gold" },
  verified: { bg: "bg-verified/10", text: "text-verified" },
};

const WhatYouGet = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 font-heading">
            What you actually <span className="text-gold">get</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {outcomes.map((item, i) => {
            const colors = colorMap[item.color];
            return (
              <motion.div
                key={item.title}
                className="glass-card p-7"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className={`w-11 h-11 rounded-2xl ${colors.bg} flex items-center justify-center mb-4`}>
                  <item.icon className={`w-5 h-5 ${colors.text}`} />
                </div>
                <h3 className="font-semibold mb-2 font-heading">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatYouGet;
