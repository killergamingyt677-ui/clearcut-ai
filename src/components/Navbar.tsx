import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "Pricing", href: "/#pricing" },
  { label: "API Docs", href: "/api-docs" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ZeroBG AI" className="h-9 w-9 rounded-lg" />
          <span className="text-lg font-bold gradient-text">ZeroBG</span>
        </Link>

        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost-nav" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button variant="gradient" asChild>
            <Link to="/register">Get Started Free</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl p-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block text-sm text-muted-foreground hover:text-foreground py-2" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2">
            <Button variant="ghost-nav" asChild>
              <Link to="/login">Log in</Link>
            </Button>
            <Button variant="gradient" asChild>
              <Link to="/register">Get Started Free</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
