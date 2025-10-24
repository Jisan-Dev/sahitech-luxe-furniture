import { Star } from "lucide-react";

export default function ProductCardRating({ reviews, rating }) {
  // const avgRatings = reviews
  //   ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
  //   : 0;

  return (
    <div className="flex items-center gap-2 mb-2">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < Math.floor(rating) ? "fill-primary/60 text-primary/60" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
      {/* <span className="text-xs text-muted-foreground">
        ({reviews.length} review{reviews.length !== 1 ? "s" : ""})
      </span> */}
    </div>
  );
}
