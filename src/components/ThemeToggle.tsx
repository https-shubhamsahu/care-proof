import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      className="relative w-16 h-8 rounded-full border border-border/50 bg-muted/50 hover:bg-muted/80 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-ring/30 flex-shrink-0"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background scenery */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Stars (dark mode) */}
        <motion.div
          animate={{ opacity: isDark ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="absolute top-1.5 left-2 w-0.5 h-0.5 rounded-full bg-foreground/40" />
          <div className="absolute top-3 left-5 w-[3px] h-[3px] rounded-full bg-foreground/30" />
          <div className="absolute top-1 left-8 w-0.5 h-0.5 rounded-full bg-foreground/50" />
        </motion.div>

        {/* Clouds (light mode) */}
        <motion.div
          animate={{ opacity: isDark ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <div className="absolute top-2 right-3 w-3 h-1.5 rounded-full bg-foreground/10" />
          <div className="absolute bottom-2 right-6 w-2 h-1 rounded-full bg-foreground/8" />
        </motion.div>
      </div>

      {/* Toggle knob - Sun/Moon */}
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full flex items-center justify-center"
        animate={{
          left: isDark ? "4px" : "calc(100% - 28px)",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        {/* Moon face */}
        <motion.div
          animate={{ opacity: isDark ? 1 : 0, scale: isDark ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-full bg-accent flex items-center justify-center text-[10px]"
        >
          🌙
        </motion.div>

        {/* Sun face */}
        <motion.div
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 rounded-full bg-accent flex items-center justify-center text-[10px]"
        >
          🌻
        </motion.div>
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
