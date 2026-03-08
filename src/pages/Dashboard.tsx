import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CareScoreGauge from "@/components/CareScoreGauge";
import EconomicValue from "@/components/EconomicValue";
import CareTimeline from "@/components/CareTimeline";
import PortfolioSection from "@/components/PortfolioSection";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-6">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-3xl font-semibold mb-2">
              Your <span className="text-gradient-sage">Care Impact</span>
            </h1>
            <p className="text-muted-foreground">
              A personal growth dashboard for your caregiving journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <CareScoreGauge />
            <EconomicValue />
          </div>

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
