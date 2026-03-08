import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareScoreGauge from "@/components/CareScoreGauge";
import EconomicValue from "@/components/EconomicValue";
import CareTimeline from "@/components/CareTimeline";
import PortfolioSection from "@/components/PortfolioSection";
import AffirmationCard from "@/components/AffirmationCard";
import CareMetrics from "@/components/CareMetrics";
import RecognitionCard from "@/components/RecognitionCard";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
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
            <h1 className="text-3xl sm:text-4xl font-semibold mb-3 font-heading">
              Your <span className="text-primary">CareScore</span> Recognition
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every hour of care you give builds something real. Here's the proof.
            </p>
          </motion.div>

          {/* Affirmation */}
          <AffirmationCard />

          {/* CareScore Gauge + Economic Value */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CareScoreGauge />
            <EconomicValue />
          </div>

          {/* Metric Cards */}
          <div className="mb-6">
            <CareMetrics />
          </div>

          {/* Recognition Message */}
          <div className="mb-6">
            <RecognitionCard />
          </div>

          {/* Timeline + Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CareTimeline />
            <PortfolioSection />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
