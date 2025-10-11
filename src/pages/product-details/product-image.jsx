export default function ProductImage({ productImage, productName, productIsOnSale }) {
  return (
    <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
      <img
        src={productImage || "/placeholder.svg"}
        alt={productName}
        className="w-full h-full object-cover"
      />
      {productIsOnSale && (
        <div className="absolute top-4 right-4 bg-accent text-accent-foreground text-sm font-semibold px-3 py-1 rounded">
          SALE
        </div>
      )}
    </div>
  );
}
