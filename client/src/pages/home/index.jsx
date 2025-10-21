import CategoryShowcase from "./category-showcase";
import FeaturedProducts from "./featured-products";
import FlashSale from "./flash-sale";
import Hero from "./hero";
import NewArrivals from "./new-arrivals";
import Newsletter from "./newsletter";
import PromoSection from "./promo-section";
import Testimonials from "./testimonials";
import TrustBadges from "./trust-badges";

export default function Homepage() {
  return (
    <>
      <Hero />
      <NewArrivals />
      <FeaturedProducts />
      <CategoryShowcase />
      <FlashSale />
      <PromoSection />
      <Testimonials />
      <TrustBadges />
      <Newsletter />
    </>
  );
}
