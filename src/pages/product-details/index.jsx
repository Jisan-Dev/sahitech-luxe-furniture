import { Button } from "@/components/ui/button";
import { products } from "@/lib/products-data";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number.parseInt(params.id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Button onClick={() => navigate("/products")}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const displayPrice = product?.sale ? product?.salePrice : product?.price;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-6 pb-10">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate("/products")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.sale && (
              <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded">
                SALE
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
            </div>

            <div className="mb-6">
              {product.sale ? (
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-foreground/80">
                    ${product.salePrice}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.price}
                  </span>
                  <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
                    Save ${product.price - product.salePrice}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
              )}
            </div>

            <div className="mb-8">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
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

            {/* Product Details */}
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-semibold mb-4">Product Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Premium quality materials</li>
                <li>• Expert craftsmanship</li>
                <li>• Free shipping on orders over $500</li>
                <li>• 30-day return policy</li>
                <li>• 1-year warranty included</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
