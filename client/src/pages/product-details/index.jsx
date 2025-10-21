import { Button } from "@/components/ui/button";
import { products } from "@/lib/products-data";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductImage from "./product-image";
import ProductInfoSection from "./product-info-section";

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
          <ProductImage
            productImage={product?.image}
            productName={product?.name}
            productIsOnSale={product?.sale}
          />

          {/* Product Info */}
          <ProductInfoSection
            product={product}
            quantity={quantity}
            setQuantity={setQuantity}
            displayPrice={displayPrice}
          />
        </div>
      </div>
    </div>
  );
}
