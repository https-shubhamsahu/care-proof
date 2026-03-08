import { motion } from "framer-motion";
import { Upload, Brain, BarChart3, FileText } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Evidence",
    description: "Share documents, receipts, schedules, or notes that reflect your caregiving work.",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Our gentle AI identifies care activities and maps them to professional skills.",
  },
  {
    icon: BarChart3,
    title: "Track Impact",
    description: "Watch your CareScore grow as you document hours, skills, and economic value.",
  },
  {
    icon: FileText,
    title: "Build Your Portfolio",
    description: "Transform care experience into professional resume sections and reports.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4">
            How <span className="text-gradient-sage">CareProof</span> Works
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Four gentle steps to transform invisible care into visible, recognized experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="glass-card p-6 text-center group hover:border-primary/30 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Step {i + 1}</p>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
