import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const EthicalPromise = () => {
  return (
    <section className="py-20 px-6 bg-muted/30">
      <div className="container mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl font-semibold mb-6 font-heading">Our ethical promise</h2>
          <p className="text-muted-foreground leading-relaxed">
            CareProof is designed to empower, not exploit. Your documents remain yours. We ask for permission before sharing anything externally. We will <span className="text-foreground font-semibold">NEVER</span> monetize your personal caregiving records without explicit consent. Transparency and dignity are core to our product.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default EthicalPromise;
