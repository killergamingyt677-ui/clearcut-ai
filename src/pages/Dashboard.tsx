import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Upload, Image, CreditCard, Settings, LogOut, BarChart3, Key, History } from "lucide-react";
import UploadZone from "@/components/dashboard/UploadZone";

const sidebarLinks = [
  { icon: Upload, label: "Upload", href: "/dashboard" },
  { icon: History, label: "History", href: "/dashboard/history" },
  { icon: CreditCard, label: "Credits", href: "/dashboard/credits" },
  { icon: BarChart3, label: "Usage", href: "/dashboard/usage" },
  { icon: Key, label: "API Keys", href: "/dashboard/api-keys" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

const Dashboard = () => (
  <div className="min-h-screen bg-background flex">
    {/* Sidebar */}
    <aside className="hidden md:flex flex-col w-64 border-r border-border/50 bg-card/30">
      <div className="p-4 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="ZeroBG" className="h-8 w-8 rounded-lg" />
          <span className="font-bold gradient-text">ZeroBG</span>
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-border/50">
        <div className="glass-card rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-muted-foreground">Free Plan</span>
            <span className="text-primary font-medium">3/5</span>
          </div>
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-3/5 gradient-btn rounded-full" />
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">3 of 5 free images used today</p>
        </div>
        <Button variant="ghost-nav" size="sm" className="w-full justify-start gap-2">
          <LogOut className="w-4 h-4" /> Log out
        </Button>
      </div>
    </aside>

    {/* Main */}
    <main className="flex-1 p-6 lg:p-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">Remove Background</h1>
        <p className="text-muted-foreground mb-8">Upload an image to remove its background instantly.</p>
        <UploadZone />
      </div>
    </main>
  </div>
);

export default Dashboard;
