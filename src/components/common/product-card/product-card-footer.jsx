import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router";

export default function ProductCardFooter({ product, onAddToCart }) {
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
      <Link to={`/products/${product.id}`}>
        <Button variant="outline">View</Button>
      </Link>
    </div>
  );
}
