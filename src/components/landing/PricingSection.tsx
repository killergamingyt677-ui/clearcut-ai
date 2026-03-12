import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    price: "₹0",
    period: "forever",
    features: ["5 images per day", "Standard quality", "JPG & PNG support", "Manual upload"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "₹499",
    period: "/month",
    features: ["Unlimited images", "HD quality output", "All formats supported", "Batch processing", "Priority processing", "API access"],
    cta: "Go Pro",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: ["Everything in Pro", "Dedicated support", "Custom API limits", "SLA guarantee", "Volume discounts", "White-label option"],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-20 bg-card/30">
    <div className="container">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold mb-3 text-foreground">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground">Start free. Upgrade when you need more.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-lg p-6 flex flex-col ${
              plan.popular ? "neon-border bg-card" : "glass-card"
            }`}
          >
            {plan.popular && (
              <div className="text-xs font-semibold gradient-text mb-2">MOST POPULAR</div>
            )}
            <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
            <div className="mt-3 mb-6">
              <span className="text-3xl font-extrabold text-foreground">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button variant={plan.popular ? "gradient" : "outline"} className="w-full" asChild>
              <Link to="/register">{plan.cta}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
