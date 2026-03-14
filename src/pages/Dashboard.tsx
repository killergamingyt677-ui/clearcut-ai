import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { Upload, Image, CreditCard, Settings, LogOut, BarChart3, Key, History as HistoryIcon } from "lucide-react";
import UploadZone from "@/components/dashboard/UploadZone";
import History from "@/components/dashboard/History";

const sidebarLinks = [
  { icon: Upload, label: "Upload", href: "/dashboard", id: "upload" },
  { icon: HistoryIcon, label: "History", href: "/dashboard/history", id: "history" },
  { icon: CreditCard, label: "Credits", href: "/dashboard/credits", id: "credits" },
  { icon: BarChart3, label: "Usage", href: "/dashboard/usage", id: "usage" },
  { icon: Key, label: "API Keys", href: "/dashboard/api-keys", id: "api-keys" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings", id: "settings" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("upload");

  return (
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
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                activeTab === link.id
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </button>
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
        <div className="max-w-6xl mx-auto">
          {/* Tab Headers - Mobile */}
          <div className="md:hidden mb-6 flex gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "upload"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              Upload
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === "history"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              History
            </button>
          </div>

          {/* Upload Tab */}
          {activeTab === "upload" && (
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Remove Background</h1>
              <p className="text-muted-foreground mb-8">Upload an image to remove its background instantly.</p>
              <UploadZone />
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Background Removal History</h1>
              <p className="text-muted-foreground mb-8">View and manage your previously processed images.</p>
              <History />
            </div>
          )}

          {/* Other Tabs - Coming Soon */}
          {(activeTab === "credits" || activeTab === "usage" || activeTab === "api-keys" || activeTab === "settings") && (
            <div className="glass-card rounded-lg p-12 text-center">
              <Image className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h2 className="text-xl font-semibold text-foreground mb-2">Coming Soon</h2>
              <p className="text-muted-foreground">This section is under development.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
