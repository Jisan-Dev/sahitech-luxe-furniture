import { Award, Headphones, Shield, Truck } from "lucide-react";

const badges = [
  {
    icon: Truck,
    title: "Free Delivery",
    description: "On orders over $500",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure transactions",
  },
  {
    icon: Award,
    title: "Quality Guarantee",
    description: "5-year warranty included",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer service",
  },
];

export default function TrustBadges() {
  return (
    <section className="pt-16 pb-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-2">{badge.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
