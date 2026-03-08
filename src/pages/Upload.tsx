import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Upload, FileText, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeartParticles from "@/components/HeartParticles";

interface ExtractedEntry {
  activity: string;
  date: string;
  hours: string;
  skills: string[];
}

const Upload_Page = () => {
  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [extracted, setExtracted] = useState<ExtractedEntry | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  const simulateAnalysis = useCallback(() => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setExtracted({
        activity: "Elder Care Support",
        date: "12 May 2024",
        hours: "4 hours",
        skills: ["Healthcare coordination", "Emotional support", "Family communication"],
      });
    }, 2500);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      simulateAnalysis();
    },
    [simulateAnalysis]
  );

  const handleFileSelect = useCallback(() => {
    simulateAnalysis();
  }, [simulateAnalysis]);

  const handleConfirm = () => {
    setShowHearts(true);
    setTimeout(() => {
      setConfirmed(true);
      setShowHearts(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl sm:text-3xl font-semibold mb-3 font-heading">
              Upload Your <span className="text-gradient-primary">Care Evidence</span>
            </h1>
            <p className="text-muted-foreground">
              Place something meaningful into this trusted space.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {!analyzing && !extracted && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`glass-card p-12 border-2 border-dashed transition-all duration-300 cursor-pointer text-center ${
                  dragOver ? "border-verified/60 bg-verified/5 glow-verified" : "border-primary/20 hover:border-primary/40"
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={handleFileSelect}
              >
                <Upload className="w-10 h-10 text-primary/50 mx-auto mb-4" />
                <p className="font-medium mb-2">Upload something that shows your care work</p>
                <p className="text-sm text-muted-foreground">
                  Medical reports • School documents • Receipts • Notes
                </p>
                <p className="text-xs text-muted-foreground/50 mt-4">
                  Click or drag & drop
                </p>
              </motion.div>
            )}

            {analyzing && (
              <motion.div
                key="analyzing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-12 text-center glow-primary"
              >
                <HeartHandshake className="w-12 h-12 text-primary mx-auto mb-4 animate-float" />
                <p className="font-medium text-primary mb-2 font-heading">Recognizing your impact…</p>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Gently uncovering the care within your document
                </p>
              </motion.div>
            )}

            {extracted && !confirmed && (
              <motion.div
                key="extracted"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card p-8 glow-primary relative overflow-hidden"
              >
                <HeartParticles trigger={showHearts} />

                <div className="flex items-center gap-2 text-primary mb-6">
                  <FileText className="w-5 h-5" />
                  <p className="text-sm font-medium">We found a caregiving activity:</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gradient-primary font-heading">{extracted.activity}</h3>
                  <div className="flex gap-6 text-sm text-muted-foreground">
                    <span>Date: {extracted.date}</span>
                    <span>Estimated Time: {extracted.hours}</span>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Skills involved:</p>
                    <div className="flex flex-wrap gap-2">
                      {extracted.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full mt-8 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl relative z-20"
                  onClick={handleConfirm}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirm Your Contribution
                </Button>
              </motion.div>
            )}

            {confirmed && (
              <motion.div
                key="confirmed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-12 text-center glow-verified"
              >
                <div className="w-16 h-16 rounded-full bg-verified/15 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-verified" />
                </div>
                <h3 className="text-xl font-semibold mb-2 font-heading">Your care has been recognized.</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Thank you for sharing your story. Every moment of care shapes the world.
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
                    onClick={() => { setExtracted(null); setConfirmed(false); }}
                  >
                    Share Another Moment
                  </Button>
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl">
                    <a href="/dashboard">View Your Impact</a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!analyzing && !extracted && (
            <motion.p
              className="text-center text-xs text-muted-foreground/40 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Every care journey begins somewhere. Upload your first moment of care.
            </motion.p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Upload_Page;
