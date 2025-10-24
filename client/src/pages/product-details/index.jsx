import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProducts";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductImage from "./product-image";
import ProductInfoSection from "./product-info-section";

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  // const product = products.find((p) => p.id === Number.parseInt(params.id));
  const { data: product, isLoading } = useProduct(params?.id);
  console.log(product);

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading Details...</p>
        </div>
      </div>
    );

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

  const displayPrice = product?.inSale ? product?.salePrice : product?.price;

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
            productImage={product?.images[0].url}
            productName={product?.name}
            productIsOnSale={product?.inSale}
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
