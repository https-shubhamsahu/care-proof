import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/components/AuthProvider";
import { LogOut } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Upload Evidence", path: "/upload" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Future Security", path: "/future-security" },
    { label: "Community", path: "/community" },
  ];

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

        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-200 ${
                location.pathname === item.path
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {item.label}
            </Link>
          ))}
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
