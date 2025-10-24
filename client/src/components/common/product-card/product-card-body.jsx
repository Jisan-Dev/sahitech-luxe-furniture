import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";
import ProductCardPrice from "./product-card-price";
import ProductCardRating from "./product-card-rating";

export default function ProductCardBody({ product }) {
  return (
    <Link to={`/products/${product._id}`}>
      <div className="p-4">
        <Badge variant={"outline"} className="mb-2 tracking-wide text-muted-foreground text-xs">
          {product.category.name}
        </Badge>
        <h3 className="font-semibold text-lg text-primary/90 mb-1 group-hover:text-primary transition-colors text-balance">
          {product.name}
        </h3>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>

        <ProductCardRating reviews={product.reviews} rating={product.rating} />

        <ProductCardPrice
          isInSale={product.inSale}
          price={product.price}
          salePrice={product.salePrice}
        />
      </div>
    </Link>
  );
}
