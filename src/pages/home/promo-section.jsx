import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function PromoSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="p-8 md:p-12 lg:p-16">
              <div className="inline-block bg-accent text-accent-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide mb-6">
                Limited Time Offer
              </div>

              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance">
                Save up to 30% on selected items
              </h2>

              <p className="text-primary-foreground/90 mb-8 leading-relaxed text-pretty">
                Elevate your home with our premium furniture collection. Exclusive discounts
                available for a limited time only.
              </p>

              <Link to="/products">
                <Button size="lg" variant="secondary">
                  Shop Sale Items
                </Button>
              </Link>
            </div>

            <div className="h-[300px] md:h-full min-h-[400px]">
              <img
                src="/luxury-furniture-showroom.png"
                alt="Sale promotion"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
