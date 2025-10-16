import { Button } from "@/components/ui/button";
import { Eye, Heart } from "lucide-react";

export default function ProductCardHeader({
  product,
  showNewBadge = false,
  setIsModalOpen,
  onAddToFavorites,
  isFavorite,
}) {
  return (
    <>
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
            onClick={() => setIsModalOpen(true)}>
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-md"
            onClick={onAddToFavorites}>
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite ? "fill-destructive text-destructive" : ""
              }`}
            />
          </Button>
        </div>
      </div>
    </>
  );
}
