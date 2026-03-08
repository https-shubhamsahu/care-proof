import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { SlideTabs } from "@/components/ui/slide-tabs";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";
import { LogOut } from "lucide-react";

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

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="CareProof" className="h-9 w-9 rounded-full" />
          <span className="text-lg font-semibold text-gradient-primary font-heading">CareProof</span>
        </Link>

        <div className="hidden lg:block">
          <SlideTabs
            tabs={navItems}
            activeTab={location.pathname}
            onTabChange={(path) => navigate(path)}
          />
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <Button
              variant="outline"
              size="sm"
              onClick={handleSignOut}
              className="border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
            >
              <LogOut className="w-4 h-4 mr-1.5" />
              Sign Out
            </Button>
          ) : (
            <Button
              asChild
              variant="outline"
              size="sm"
              className="border-primary/30 text-primary hover:bg-primary/10 rounded-2xl"
            >
              <Link to="/auth">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
