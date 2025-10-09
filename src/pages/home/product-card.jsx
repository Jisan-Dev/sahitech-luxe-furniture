import { Link } from "react-router";

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
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.category}
          </p>
          <h3 className="font-medium text-foreground mb-2 group-hover:text-primary transition-colors text-balance">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              {product.sale ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-foreground">${product.salePrice}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="font-bold text-foreground">${product.price}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
