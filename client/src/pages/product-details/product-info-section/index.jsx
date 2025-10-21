import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Heading from "./heading";
import Price from "./price";
import ProductFeatures from "./product-features";

export default function ProductInfoSection({ product, quantity, setQuantity, displayPrice }) {
  return (
    <div className="flex flex-col">
      {/* Product Title and Category */}
      <Heading productCategory={product?.category} productName={product?.name} />

      {/* Price Section */}
      <Price
        productIsOnSale={product?.sale}
        productMainPrice={product?.price}
        productSalePrice={product?.salePrice}
      />

      {/* Product Description */}
      <div className="mb-8">
        <p className="text-muted-foreground leading-relaxed">{product?.description}</p>
      </div>

      {/* Quantity Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Quantity</label>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}>
            -
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
            +
          </Button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <Button size="lg" className="w-full md:w-auto">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart - ${displayPrice * quantity}
      </Button>

      {/* Product Features */}
      <ProductFeatures />
    </div>
  );
}
