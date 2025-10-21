import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";

export default function ProductCardFooter({ product, onAddToCart, setIsModalOpen }) {
  return (
    <div className="p-4 pt-0 flex gap-2">
      <Button
        className="flex-1"
        onClick={() => onAddToCart(product)}
        // disabled={!product?.inStock}
        disabled={false}>
        <ShoppingCart className="w-4 h-4 mr-2" />
        Add to Cart
        {/* {product?.inStock ? "Add to Cart" : "Out of Stock"} */}
      </Button>

      <Button
        onClick={() => setIsModalOpen(true)}
        variant="outline"
        className={"text-sm font-medium"}>
        View
        <Eye />
      </Button>
    </div>
  );
}
