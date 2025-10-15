import { onAddToFavorites } from "@/lib/utils";
import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function ProductCard({ product, showNewBadge = false }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const avgRatings = product.reviews
    ? product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length
    : 0;

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    onAddToFavorites?.(product); //In React (or other JS code), sometimes a prop may or may not be passed: if it's not passed, it will be undefined. The optional chaining operator (?.) allows you to safely call the function only if it exists. If onAddToFavorites is undefined, the function call is skipped, preventing potential runtime errors. (TypeError: onAddToFavorites is not a function). although we have defined it in utils.js but still good to have this check.
  };

  return (
    <div className="group">
      <div className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.sale && (
            <div className="absolute top-3 right-3 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
              SALE
            </div>
          )}
          {showNewBadge && !product.sale && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              NEW
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-5 gap-2 z-50 max-lg:hidden">
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-md"
              // onClick={() => setIsModalOpen(true)}
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-md"
              onClick={handleAddToFavorites}>
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isFavorite ? "fill-destructive text-destructive" : ""
                }`}
              />
            </Button>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <div className="p-4">
            {/* <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
              {product.category}
            </p> */}
            <Badge variant={"outline"} className="mb-2 tracking-wide text-muted-foreground text-xs">
              {product.category}
            </Badge>
            <h3 className="font-semibold text-lg text-primary/90 mb-1 group-hover:text-primary transition-colors text-balance">
              {product.name}
            </h3>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(avgRatings)
                        ? "fill-primary/60 text-primary/60"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviews.length} review{product.reviews.length !== 1 ? "s" : ""})
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                {product.sale ? (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-foreground">${product.salePrice}</span>
                    <span className="text-sm text-muted-foreground line-through">
                      ${product.price}
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-foreground">${product.price}</span>
                )}
              </div>
            </div>
          </div>
        </Link>

        <div className="p-4 pt-0 flex gap-2">
          <Button
            className="flex-1"
            // onClick={handleAddToCart}
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
      </div>
    </div>
  );
}
