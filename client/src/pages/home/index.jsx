import { useAuth } from "@/contexts/auth-context";
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
  const { user } = useAuth();
  const [newProducts, featuredProducts, flashSaleProducts] =
    useHomepageProducts();
  console.log(user);

  if (
    newProducts.isLoading ||
    featuredProducts.isLoading ||
    flashSaleProducts.isLoading
  )
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="border-primary mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-t-transparent"></div>
          <p className="text-text-muted">Loading Homepage...</p>
        </div>
      </div>
    );
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
