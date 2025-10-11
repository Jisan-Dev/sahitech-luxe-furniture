import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Hero() {
  return (
    <section className="relative bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 pb-16 pt-5">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div className="inline-block ">
              <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                New Collection
              </span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight hero-text text-balance">
              Elegant furniture for modern living
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl text-pretty">
              Transform your space with our curated collection of premium furniture. Timeless design
              meets exceptional craftsmanship.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto group">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link to="/contact">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <img
              src="/modern-luxury-sofa-in-elegant-living-room.jpg"
              alt="Luxury furniture showcase"
              className="w-full h-full object-cover rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
