import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface CommunityGlobeProps {
  totalCaregivers?: number;
}

const CommunityGlobe = ({ totalCaregivers = 0 }: CommunityGlobeProps) => {
  const [GlobeComponent, setGlobeComponent] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    import("@/components/ui/globe-hero").then((mod) => {
      setGlobeComponent(() => mod.DotGlobeHero);
    });
  }, []);

  const displayCount = totalCaregivers > 0
    ? totalCaregivers.toLocaleString("en-IN")
    : "—";

  return (
    <section className="py-10 sm:py-16 px-4 sm:px-6 bg-background">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          className="glass-card p-5 sm:p-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <p className="text-xs sm:text-sm font-semibold font-heading">Global Caregiver Network</p>
            </div>
          </div>

          <div className="relative h-[250px] sm:h-[350px] rounded-2xl overflow-hidden -mx-2">
            {GlobeComponent ? (
              <GlobeComponent rotationSpeed={0.002} globeRadius={1.1} className="min-h-[250px] sm:min-h-[350px]">
                <div className="text-center pointer-events-none">
                  <p className="text-2xl sm:text-3xl font-semibold font-heading text-primary">
                    {displayCount}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">caregivers worldwide</p>
                </div>
              </GlobeComponent>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {totalCaregivers > 0 && (
            <div className="flex items-center gap-2 mt-4 relative z-10">
              <div className="w-2 h-2 rounded-full bg-verified animate-pulse" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                <span className="text-foreground font-semibold">{totalCaregivers}</span> caregivers
                are building their verified portfolios.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityGlobe;
