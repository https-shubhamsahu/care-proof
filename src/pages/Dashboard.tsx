import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareScoreGauge from "@/components/CareScoreGauge";
import EconomicValue from "@/components/EconomicValue";
import CareTimeline from "@/components/CareTimeline";
import PortfolioSection from "@/components/PortfolioSection";
import AffirmationCard from "@/components/AffirmationCard";
import CareMetrics from "@/components/CareMetrics";
import RecognitionCard from "@/components/RecognitionCard";
import { useCareScore, useCareValuation, useCareEntries } from "@/hooks/useCareData";
import { useAuth } from "@/components/AuthProvider";

const EmptyState = () => (
  <motion.div
    className="glass-card p-12 text-center col-span-full"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
      <Upload className="w-8 h-8 text-primary" />
    </div>
    <h2 className="text-xl font-semibold mb-2 font-heading">Your dashboard is ready.</h2>
    <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto leading-relaxed">
      Upload your first piece of care evidence and we'll calculate your CareScore and economic impact instantly.
    </p>
    <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl">
      <Link to="/upload">Upload Your First Moment</Link>
    </Button>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const { data: scoreData, isLoading: scoreLoading } = useCareScore();
  const { data: valuationData, isLoading: valuationLoading } = useCareValuation();
  const { data: entries, isLoading: entriesLoading } = useCareEntries();

  const isLoading = scoreLoading || valuationLoading || entriesLoading;
  const hasData = (entries?.length ?? 0) > 0;

  const score = scoreData?.total_score ?? 0;
  const lifetimeValue = valuationData?.lifetime_value_inr ?? 0;
  const responsibility = scoreData?.responsibility_points ?? 0;
  const consistency = scoreData?.consistency_points ?? 0;
  const complexity = scoreData?.complexity_points ?? 0;
  const totalHours = scoreData?.total_hours ?? 0;
  const totalEntries = scoreData?.total_entries ?? 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <motion.div
            className="mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-primary/70 mb-3 font-heading">
              Recognizing your impact
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 font-heading">
              Your <span className="text-primary">CareScore</span> Recognition
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every hour of care you give builds something real. Here's the proof.
            </p>
          </motion.div>

          {/* Loading skeleton */}
          {isLoading && (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Empty state */}
          {!isLoading && !hasData && <EmptyState />}

          {/* Live dashboard */}
          {!isLoading && hasData && (
            <>
              {/* Affirmation */}
              <AffirmationCard
                totalEntries={totalEntries}
                totalHours={totalHours}
              />

              {/* CareScore Gauge + Economic Value */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <CareScoreGauge score={score} />
                <EconomicValue value={lifetimeValue} />
              </div>

              {/* Metric Cards */}
              <div className="mb-6">
                <CareMetrics
                  responsibility={responsibility}
                  consistency={consistency}
                  complexity={complexity}
                />
              </div>

              {/* Recognition Message */}
              <div className="mb-6">
                <RecognitionCard
                  totalEntries={totalEntries}
                  totalHours={totalHours}
                />
              </div>

              {/* Timeline + Portfolio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CareTimeline entries={entries ?? []} />
                <PortfolioSection entries={entries ?? []} />
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
