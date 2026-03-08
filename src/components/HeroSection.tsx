import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden pt-16">
      {/* Floating botanical shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-[10%] w-64 h-64 rounded-full bg-sage/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-[15%] w-48 h-48 rounded-full bg-teal/5 blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full bg-gold/3 blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center gap-8 max-w-3xl mx-auto"
        >
          <motion.img
            src={logo}
            alt="CareProof logo"
            className="w-24 h-24 rounded-full glow-sage"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />

          <div className="space-y-4">
            <motion.p
              className="text-sm font-medium tracking-widest uppercase text-primary/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your care matters. Let's make it visible.
            </motion.p>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Your care work{" "}
              <span className="text-gradient-sage">matters.</span>
              <br />
              Let's turn it into{" "}
              <span className="text-gradient-gold">recognized experience.</span>
            </motion.h1>

            <motion.p
              className="text-lg text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Millions of hours of caregiving go unseen.
              CareProof helps you document, validate, and translate that work into real-world value.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-sage px-8 text-base">
              <Link to="/upload">
                Start Documenting Your Care
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/30 px-8 text-base">
              <a href="#how-it-works">
                <Play className="mr-2 h-4 w-4" />
                See How CareProof Works
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
