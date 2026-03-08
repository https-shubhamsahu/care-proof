import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/30 py-8 sm:py-12 px-4 sm:px-6">
    <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-3">
        <img src={logo} alt="CareProof" className="h-8 w-8 rounded-full" />
        <span className="text-sm text-muted-foreground">
          © 2026 CareProof. Every moment of care counts.
        </span>
      </div>
      <p className="text-xs text-muted-foreground/60">
        Built with dignity, empathy, and quiet empowerment.
      </p>
    </div>
  </footer>
);

export default Footer;
