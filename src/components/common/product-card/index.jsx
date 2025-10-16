import { handleAddToCart, onAddToFavorites } from "@/lib/utils";
import { useState } from "react";
import ProductCardBody from "./product-card-body";
import ProductCardFooter from "./product-card-footer";
import ProductCardHeader from "./product-card-header";
import ProductModal from "./product-modal";

export default function ProductCard({ product, showNewBadge = false }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    onAddToFavorites?.(product); //In React (or other JS code), sometimes a prop may or may not be passed: if it's not passed, it will be undefined. The optional chaining operator (?.) allows you to safely call the function only if it exists. If onAddToFavorites is undefined, the function call is skipped, preventing potential runtime errors. (TypeError: onAddToFavorites is not a function). although we have defined it in utils.js but still good to have this check.
  };

  return (
    <>
      <div className="group">
        <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
          <ProductCardHeader
            onAddToFavorites={handleAddToFavorites}
            isFavorite={isFavorite}
            product={product}
            setIsModalOpen={setIsModalOpen}
            showNewBadge={showNewBadge}
          />

          <ProductCardBody product={product} />

          <ProductCardFooter product={product} onAddToCart={handleAddToCart} />
        </div>
      </div>

      <ProductModal
        onAddToFavorites={handleAddToFavorites}
        onAddToCart={handleAddToCart}
        onOpenChange={setIsModalOpen}
        open={isModalOpen}
        product={product}
      />
    </>
  );
}
