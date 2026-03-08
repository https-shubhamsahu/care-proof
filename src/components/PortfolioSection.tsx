import { motion } from "framer-motion";
import { FileText, Download, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CareEntry } from "@/hooks/useCareData";

interface PortfolioSectionProps {
  entries?: CareEntry[];
}

const PortfolioSection = ({ entries = [] }: PortfolioSectionProps) => {
  // Collect all unique skills across entries
  const allSkills = Array.from(
    new Set(entries.flatMap((e) => e.skills))
  ).slice(0, 6);

  // Date range
  const dates = entries.map((e) => e.date).sort();
  const startDate = dates[0]
    ? new Date(dates[0]).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;
  const endDate = dates[dates.length - 1]
    ? new Date(dates[dates.length - 1]).toLocaleDateString("en-IN", { month: "short", year: "numeric" })
    : null;
  const dateRange = startDate && endDate && startDate !== endDate
    ? `${startDate} – ${endDate}`
    : startDate ?? "Recent";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="glass-card p-8">
      <div className="flex items-center gap-2 mb-6">
        <Briefcase className="w-4 h-4 text-gold" />
        <h3 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground font-heading">
          Your Story, Professionally
        </h3>
      </div>

      <motion.div
        className="rounded-2xl border border-border/30 bg-muted/20 p-6 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="text-lg font-semibold mb-1 font-heading">Family Care Coordinator</h4>
        <p className="text-sm text-muted-foreground mb-4">{dateRange}</p>
        {allSkills.length > 0 ? (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
              Skills Verified
            </p>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((s) => (
                <span
                  key={s}
                  className="text-xs px-3 py-1 rounded-full bg-gold/10 text-gold border border-gold/20"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">
            Skills will appear as you upload more care evidence.
          </p>
        )}
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          className="flex-1 border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
          disabled={entries.length === 0}
          onClick={handlePrint}
        >
          <FileText className="w-4 h-4 mr-2" />
          Generate Resume Section
        </Button>
        <Button
          variant="outline"
          className="flex-1 border-gold/30 text-gold hover:bg-gold/10 rounded-2xl"
          disabled={entries.length === 0}
          onClick={handlePrint}
        >
          <Download className="w-4 h-4 mr-2" />
          Download Your CareProof
        </Button>
      </div>
    </div>
  );
};

export default PortfolioSection;
