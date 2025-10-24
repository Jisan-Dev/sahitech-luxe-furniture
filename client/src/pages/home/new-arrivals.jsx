import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import ProductCard from "../../components/common/product-card";

export default function NewArrivals({ products }) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
              New Arrivals
            </h2>
            <p className="text-muted-foreground">Fresh additions to our collection</p>
          </div>
          <Link to="/products">
            <Button variant="outline" className="hidden md:inline-flex bg-transparent">
              View All
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} showNewBadge />
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link to="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
