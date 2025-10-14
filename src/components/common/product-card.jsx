import { Star } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "../ui/badge";

export default function ProductCard({ product, showNewBadge = false }) {
  return (
    <Link to={`/products/${product.id}`} className="group">
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
        </div>

        <div className="p-4">
          {/* <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.category}
          </p> */}
          <Badge variant={"outline"} className="mb-2 tracking-wide text-muted-foreground text-xs">
            {product.category}
          </Badge>
          <h3 className="font-semibold text-lg text-primary/80 mb-1 group-hover:text-primary transition-colors text-balance">
            {product.name}
          </h3>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(1) ? "fill-primary/80 text-primary/80" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            {/* <span className="text-xs text-muted-foreground">
              ({product.reviews})
            </span> */}
          </div>

          <div className="flex items-center justify-between">
            <div>
              {product.sale ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-foreground">${product.salePrice}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-foreground">${product.price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
