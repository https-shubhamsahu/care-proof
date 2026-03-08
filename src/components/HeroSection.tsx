import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import CareParticles from "@/components/CareParticles";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-background">
      <CareParticles />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-[15%] w-48 h-48 rounded-full bg-gold/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 max-w-3xl mx-auto"
        >
          <motion.p
            className="text-sm font-medium tracking-widest uppercase text-primary/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Recognizing your impact
          </motion.p>

          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight font-heading"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          >
            Turn invisible care into{" "}
            <span className="text-primary">visible economic power.</span>
          </motion.h1>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            CareProof verifies the work you already do — then translates it into a professional portfolio, a CareScore, and a live monetary valuation that lenders, employers, and policymakers can actually use.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base rounded-2xl">
              <Link to="/upload">
                Get My Free CareScore
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
