import { motion } from "framer-motion";
import { ArrowRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FinalCTA = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-semibold font-heading">
            Ready to make your care <span className="text-primary">count</span>?
          </h2>

          <div className="space-y-3 text-muted-foreground text-left max-w-md mx-auto">
            <p className="flex items-start gap-3">
              <span className="text-primary font-semibold">1.</span>
              <span><span className="text-foreground font-medium">Get your Free CareScore</span> — upload a single document and see the value you already hold.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-primary font-semibold">2.</span>
              <span><span className="text-foreground font-medium">Build your Verified Portfolio</span> — convert 1–12 months of signals into a shareable portfolio.</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="text-primary font-semibold">3.</span>
              <span><span className="text-foreground font-medium">Apply your proof</span> — present to banks, employers, or use in advocacy.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 text-base rounded-2xl">
              <Link to="/upload">
                Get My Free CareScore
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-gold/30 text-gold hover:bg-gold/10 px-8 text-base rounded-2xl">
              <Link to="/upload">
                <Users className="mr-2 h-4 w-4" />
                Join Verified Beta
              </Link>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground/50">Limited seats in beta wave — early adopters get priority support</p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;
