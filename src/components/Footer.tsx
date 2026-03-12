import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50">
    <div className="container py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img src={logo} alt="ZeroBG" className="h-8 w-8 rounded-lg" />
            <span className="font-bold gradient-text">ZeroBG</span>
          </Link>
          <p className="text-sm text-muted-foreground">AI-powered background removal. Instant, precise, effortless.</p>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Product</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <a href="/#features" className="block hover:text-foreground transition-colors">Features</a>
            <a href="/#pricing" className="block hover:text-foreground transition-colors">Pricing</a>
            <Link to="/api-docs" className="block hover:text-foreground transition-colors">API</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Company</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/about" className="block hover:text-foreground transition-colors">About</Link>
            <Link to="/contact" className="block hover:text-foreground transition-colors">Contact</Link>
            <Link to="/blog" className="block hover:text-foreground transition-colors">Blog</Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-3 text-foreground">Legal</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Link to="/privacy" className="block hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="block hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} ZeroBG AI. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
