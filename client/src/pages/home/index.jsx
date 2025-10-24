import { useHomepageProducts } from "@/hooks/useProducts";
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
  const [newProducts, featuredProducts, flashSaleProducts] = useHomepageProducts();

  if (newProducts.isLoading || featuredProducts.isLoading || flashSaleProducts.isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading Homepage...</p>
        </div>
      </div>
    );

  console.log("n", newProducts.data, "fe", featuredProducts.data, "flash", flashSaleProducts.data);
  return (
    <>
      <Hero />
      <NewArrivals products={newProducts.data} />
      <FeaturedProducts products={featuredProducts.data} />
      <CategoryShowcase />
      <FlashSale products={flashSaleProducts.data} />
      <PromoSection />
      <Testimonials />
      <TrustBadges />
      <Newsletter />
    </>
  );
}
