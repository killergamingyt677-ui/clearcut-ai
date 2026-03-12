import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Upload, Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="relative hero-gradient pt-32 pb-20 overflow-hidden">
    {/* Glow orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />

    <div className="container relative z-10 text-center max-w-4xl mx-auto">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-sm text-primary mb-6">
        <Sparkles className="w-4 h-4" />
        AI-Powered Background Removal
      </div>

      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 text-foreground">
        Remove Backgrounds{" "}
        <span className="gradient-text">Instantly</span>
      </h1>

      <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
        Upload any image and get a clean, transparent background in seconds. Powered by advanced AI for pixel-perfect results.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="gradient" size="lg" className="text-base px-8 py-6" asChild>
          <Link to="/register">
            <Upload className="w-5 h-5 mr-2" />
            Start Removing Backgrounds
          </Link>
        </Button>
        <Button variant="outline" size="lg" className="text-base px-8 py-6" asChild>
          <a href="/#pricing">View Pricing</a>
        </Button>
      </div>

      <p className="mt-6 text-xs text-muted-foreground">5 free images daily • No credit card required</p>
    </div>
  </section>
);

export default HeroSection;
