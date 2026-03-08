import { useState, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HeartHandshake, Upload, FileText, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeartParticles from "@/components/HeartParticles";
import { analyseDocument } from "@/services/documentAnalysis";
import type { ExtractedEntryWithDate } from "@/services/documentAnalysis";
import { useAddCareEntry, uploadEvidenceFile } from "@/hooks/useCareData";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";

const ACCEPTED_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
];
const MAX_SIZE_MB = 10;

const UploadPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const addEntry = useAddCareEntry();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragOver, setDragOver] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [extracted, setExtracted] = useState<ExtractedEntryWithDate | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(async (file: File) => {
    setError(null);

    // Validate type
    if (!ACCEPTED_TYPES.includes(file.type) && !file.name.match(/\.(pdf|jpg|jpeg|png|webp|heic)$/i)) {
      setError("Please upload a PDF or image file (JPG, PNG, WEBP, HEIC).");
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${MAX_SIZE_MB} MB.`);
      return;
    }

    setCurrentFile(file);
    setAnalyzing(true);

    try {
      const result = await analyseDocument(file);
      setExtracted(result as ExtractedEntryWithDate);
    } catch {
      setError("We couldn't analyse this document. Please try another file.");
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleConfirm = async () => {
    if (!extracted || !user) return;
    setSaving(true);
    setShowHearts(true);

    try {
      // Upload file to Supabase Storage (best-effort — doesn't block save)
      let evidenceUrl: string | null = null;
      if (currentFile) {
        const uploaded = await uploadEvidenceFile(user.id, currentFile);
        evidenceUrl = uploaded?.url ?? null;
      }

      // Save care entry to database
      await addEntry.mutateAsync({
        activity: extracted.activity,
        date: extracted.isoDate,
        hours: extracted.hoursValue,
        skills: extracted.skills,
        care_type: extracted.careType,
        evidence_url: evidenceUrl,
        evidence_name: currentFile?.name ?? null,
      });

      setTimeout(() => {
        setConfirmed(true);
        setShowHearts(false);
        setSaving(false);
      }, 600);
    } catch (err) {
      setShowHearts(false);
      setSaving(false);
      toast.error("Failed to save your care entry. Please try again.");
    }
  };

  const reset = () => {
    setExtracted(null);
    setConfirmed(false);
    setCurrentFile(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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

          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 flex items-start gap-3 glass-card p-4 border border-destructive/30 text-destructive"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            {/* ── Drop zone ── */}
            {!analyzing && !extracted && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`glass-card p-12 border-2 border-dashed transition-all duration-300 text-center ${dragOver
                    ? "border-verified/60 bg-verified/5 glow-verified"
                    : "border-primary/20 hover:border-primary/40 cursor-pointer"
                  }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.webp,.heic"
                  className="hidden"
                  onChange={handleFileSelect}
                  id="care-evidence-input"
                />
                <Upload className="w-10 h-10 text-primary/50 mx-auto mb-4" />
                <p className="font-medium mb-2">Upload something that shows your care work</p>
                <p className="text-sm text-muted-foreground">
                  Medical reports • School documents • Receipts • Notes
                </p>
                <p className="text-xs text-muted-foreground/50 mt-4">
                  Click or drag &amp; drop · PDF, JPG, PNG up to 10 MB
                </p>
              </motion.div>
            )}

            {/* ── Analysing ── */}
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
                {currentFile && (
                  <p className="text-xs text-muted-foreground/50 mt-4 truncate max-w-xs mx-auto">
                    {currentFile.name}
                  </p>
                )}
              </motion.div>
            )}

            {/* ── Extracted result ── */}
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
                  <h3 className="text-xl font-semibold text-gradient-primary font-heading">
                    {extracted.activity}
                  </h3>
                  <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
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

                <div className="flex gap-3 mt-8">
                  <Button
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
                    onClick={reset}
                    disabled={saving}
                  >
                    Try Another
                  </Button>
                  <Button
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl relative z-20"
                    onClick={handleConfirm}
                    disabled={saving}
                  >
                    {saving ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…</>
                    ) : (
                      <><Check className="w-4 h-4 mr-2" /> Confirm Your Contribution</>
                    )}
                  </Button>
                </div>
              </motion.div>
            )}

            {/* ── Confirmed ── */}
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
                    onClick={reset}
                  >
                    Share Another Moment
                  </Button>
                  <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl">
                    <Link to="/dashboard">View Your Impact</Link>
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

export default UploadPage;
