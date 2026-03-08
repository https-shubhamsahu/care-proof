import { motion } from "framer-motion";
import { FileText, Download, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

const PortfolioSection = () => {
  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-4 h-4 text-gold" />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">Professional View</h3>
      </div>

      <motion.div
        className="rounded-xl border border-border/30 bg-muted/20 p-6 mb-6"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h4 className="text-lg font-semibold mb-1">Family Care Coordinator</h4>
        <p className="text-sm text-muted-foreground mb-4">Jan 2022 – Dec 2024</p>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Skills Gained</p>
          <div className="flex flex-wrap gap-2">
            {["Budget planning", "Healthcare coordination", "Crisis management", "Multi-stakeholder communication"].map((s) => (
              <span key={s} className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 border-primary/30 text-primary hover:bg-primary/10">
          <FileText className="w-4 h-4 mr-2" />
          Generate Resume Section
        </Button>
        <Button variant="outline" className="flex-1 border-gold/30 text-gold hover:bg-gold/10">
          <Download className="w-4 h-4 mr-2" />
          Download CareProof Report
        </Button>
      </div>
    </div>
  );
};

export default PortfolioSection;
