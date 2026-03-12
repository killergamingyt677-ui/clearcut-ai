import { Zap, Shield, Image, Code, Layers, Clock } from "lucide-react";

const features = [
  { icon: Zap, title: "Lightning Fast", desc: "Get results in under 5 seconds with our optimized AI pipeline." },
  { icon: Image, title: "Pixel Perfect", desc: "Advanced edge detection preserves hair, fur, and fine details." },
  { icon: Layers, title: "Batch Processing", desc: "Process multiple images at once with our Pro plan." },
  { icon: Code, title: "Developer API", desc: "Integrate background removal into your apps with our REST API." },
  { icon: Shield, title: "Secure & Private", desc: "Images auto-delete after 24 hours. Your data stays yours." },
  { icon: Clock, title: "24/7 Available", desc: "99.5% uptime SLA. Always ready when you need it." },
];

const FeaturesSection = () => (
  <section id="features" className="py-20 bg-background">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold mb-3 text-foreground">Why Choose ZeroBG?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Professional background removal powered by cutting-edge AI technology.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f) => (
          <div key={f.title} className="glass-card rounded-lg p-6 hover:neon-border transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg gradient-btn flex items-center justify-center mb-4 group-hover:animate-pulse-glow">
              <f.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
