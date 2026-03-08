import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyItMatters = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 bg-background">
      <div className="container mx-auto max-w-3xl">
        {/* Why this matters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 font-heading">
            Why this matters <span className="text-muted-foreground text-lg font-normal">(fast)</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            You do work that holds families and societies together — scheduling, caregiving, crisis management, budgeting, medical coordination — yet on a resume it's a "gap," at a bank it's "zero income," and in policy conversations it's invisible. That gap costs you opportunities, income, and agency.
          </p>
          <p className="text-foreground font-medium">
            CareProof changes that equation by converting real-world caregiving signals into verified, economic assets.
          </p>
        </motion.div>

        {/* Quick stat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card p-8 mb-16 border-l-4 border-l-gold"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gold/10 flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-gold" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gold mb-2 uppercase tracking-wider font-heading">Quick stat</p>
              <p className="text-muted-foreground leading-relaxed">
                Women in India spend about <span className="text-foreground font-semibold">4.6 hours a day</span> on caregiving tasks. That labor is effectively invisible in economic systems — we designed CareProof to stop treating it like it's optional.
              </p>
            </div>
          </div>
        </motion.div>

        {/* One-line pitch */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-8"
        >
          <p className="text-xl font-medium font-heading leading-relaxed max-w-2xl mx-auto">
            CareProof captures the real signals of caregiving, verifies them, and converts them into a trusted, bankable portfolio — refusing to let career gaps and unpaid labor be treated as <span className="text-primary">"zero."</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base rounded-2xl">
            <Link to="/upload">
              Create My Portfolio
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyItMatters;
