export default function Price({ productIsOnSale, productMainPrice, productSalePrice }) {
  return (
    <div className="mb-6">
      {productIsOnSale ? (
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-foreground/80">${productSalePrice}</span>
          <span className="text-xl text-muted-foreground line-through">${productMainPrice}</span>
          <span className="bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded">
            Save ${productMainPrice - productSalePrice}
          </span>
        </div>
      ) : (
        <span className="text-3xl font-bold text-foreground">${productMainPrice}</span>
      )}
    </div>
  );
}
