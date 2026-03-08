import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhyItMatters from "@/components/WhyItMatters";
import ImagineThis from "@/components/ImagineThis";
import HowItsDifferent from "@/components/HowItsDifferent";
import WhatYouGet from "@/components/WhatYouGet";
import HowItWorks from "@/components/HowItWorks";
import FeaturesSection from "@/components/FeaturesSection";
import TrustSection from "@/components/TrustSection";
import EthicalPromise from "@/components/EthicalPromise";
import FinalCTA from "@/components/FinalCTA";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhyItMatters />
      <ImagineThis />
      <HowItsDifferent />
      <WhatYouGet />
      <HowItWorks />
      <FeaturesSection />
      <TrustSection />
      <EthicalPromise />
      <FinalCTA />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
