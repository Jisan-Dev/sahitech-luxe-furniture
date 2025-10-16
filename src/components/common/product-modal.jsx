import { ExternalLink, Heart, ShoppingCart, Star } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";

export default function ProductModal({
  open,
  onOpenChange,
  product,
  onAddToCart,
  onAddToFavorites,
}) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    onOpenChange?.(false);
    navigate(`/products/${product.id}`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            {product.sale && (
              <Badge className="absolute top-4 left-4 bg-destructive text-primary-foreground">
                Sale
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "fill-primary/60 text-primary/60"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.length} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-3xl font-bold text-foreground">${product.price}</span>
                {product.sale && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.salePrice}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {product?.dimensions && (
              <div>
                <h4 className="font-semibold mb-2">Dimensions</h4>
                <p className="text-sm text-muted-foreground">
                  W {product.dimensions.width} × H {product.dimensions.height} × D{" "}
                  {product.dimensions.depth}
                </p>
              </div>
            )}

            {product?.materials && (
              <div>
                <h4 className="font-semibold mb-2">Materials</h4>
                <p className="text-sm text-muted-foreground">{product.materials.join(", ")}</p>
              </div>
            )}

            {product?.colors && (
              <div>
                <h4 className="font-semibold mb-2">Available Colors</h4>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <div
                      key={color}
                      className="w-8 h-8 rounded-full border-2 border-border"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* <Separator /> */}

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                onClick={() => onAddToCart?.(product)}
                // disabled={!product.inStock}
                className="w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                {/* {product.inStock ? "Add to Cart" : "Out of Stock"} */}
                Add to Cart
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="lg" onClick={() => onAddToFavorites?.(product)}>
                  <Heart className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="lg" onClick={handleViewDetails}>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
