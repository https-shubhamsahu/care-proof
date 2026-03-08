import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { SlideTabs } from "@/components/ui/slide-tabs";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";
import { LogOut, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Home", value: "/" },
  { label: "Upload", value: "/upload" },
  { label: "Dashboard", value: "/dashboard" },
  { label: "Security", value: "/future-security" },
  { label: "Community", value: "/community" },
];

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-14 sm:h-16 items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={logo} alt="CareProof" className="h-8 w-8 sm:h-9 sm:w-9 rounded-full" />
            <span className="text-base sm:text-lg font-semibold text-gradient-primary font-heading">CareProof</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:block">
            <SlideTabs
              tabs={navItems}
              activeTab={location.pathname}
              onTabChange={(path) => navigate(path)}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            {user ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="hidden sm:inline-flex border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Sign Out
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="hidden sm:inline-flex border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
              >
                <Link to="/auth">Sign In</Link>
              </Button>
            )}

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-14 sm:pt-16 lg:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center gap-2 p-6 pt-8">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => { navigate(item.value); setMobileOpen(false); }}
                  className={`w-full max-w-xs text-center py-3 px-6 rounded-2xl text-base font-medium font-heading transition-colors ${
                    location.pathname === item.value
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="w-full max-w-xs border-t border-border/30 mt-4 pt-4">
                {user ? (
                  <Button
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
                    onClick={() => { handleSignOut(); setMobileOpen(false); }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
                  >
                    <Link to="/auth" onClick={() => setMobileOpen(false)}>Sign In</Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
