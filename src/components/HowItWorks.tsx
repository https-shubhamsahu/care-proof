import { motion } from "framer-motion";
import { Link as LinkIcon, Brain, ShieldCheck, CheckCircle2, Briefcase, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const steps = [
  {
    icon: LinkIcon,
    title: "Connect signals",
    subtitle: "(one-time)",
    description: "Link or upload receipts, appointment logs, hospital notes, school documents, pharmacy bills. We use secure, permissioned ingestion.",
  },
  {
    icon: Brain,
    title: "We analyze & map",
    description: "Our AI translates your documents into recognized professional activities.",
  },
  {
    icon: ShieldCheck,
    title: "We verify",
    description: "Automated cross-checks + optional human review produces a verified entry.",
  },
  {
    icon: CheckCircle2,
    title: "You approve & publish",
    description: "Approve your portfolio entries and share with employers, banks, or advocacy groups.",
  },
  {
    icon: Briefcase,
    title: "You use it",
    description: "Apply for loans, explain gaps, negotiate better terms, or share with policymakers.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4 font-heading">
            How it <span className="text-primary">works</span>
          </h2>
          <p className="text-muted-foreground">
            Frictionless, step-by-step. Start small — the first step is tiny.
          </p>
        </motion.div>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="flex gap-5"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-border/50 my-2" />}
              </div>
              <div className="pb-8">
                <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Step {i + 1}</p>
                <h3 className="font-semibold mb-1 font-heading">
                  {step.title}
                  {step.subtitle && <span className="text-muted-foreground font-normal text-sm ml-1">{step.subtitle}</span>}
                </h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Button asChild variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/10 px-8 text-base rounded-2xl">
            <Link to="/upload">
              Start with one receipt
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
