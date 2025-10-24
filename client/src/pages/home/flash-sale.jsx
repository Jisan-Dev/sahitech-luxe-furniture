import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import ProductCard from "../../components/common/product-card";

export default function FlashSale({ products }) {
  // Countdown timer (24 hours from now)
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-semibold mb-4">
            FLASH SALE
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Limited Time Offers
          </h2>
          <p className="text-muted-foreground mb-6">Hurry! These deals won't last long</p>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="text-center">
              <div className="bg-background border-2 border-accent rounded-lg px-4 py-3 min-w-[70px]">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground uppercase">Hours</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-accent">:</div>
            <div className="text-center">
              <div className="bg-background border-2 border-accent rounded-lg px-4 py-3 min-w-[70px]">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground uppercase">Minutes</div>
              </div>
            </div>
            <div className="text-2xl font-bold text-accent">:</div>
            <div className="text-center">
              <div className="bg-background border-2 border-accent rounded-lg px-4 py-3 min-w-[70px]">
                <div className="text-2xl md:text-3xl font-bold text-foreground">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <div className="text-xs text-muted-foreground uppercase">Seconds</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/products">
            <Button size="lg" className="">
              Shop All Sale Items
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
