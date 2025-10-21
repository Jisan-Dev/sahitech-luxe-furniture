export default function ProductCardPrice({ isInSale, price, salePrice }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        {isInSale ? (
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">${salePrice}</span>
            <span className="text-sm text-muted-foreground line-through">${price}</span>
          </div>
        ) : (
          <span className="text-2xl font-bold text-foreground">${price}</span>
        )}
      </div>
    </div>
  );
}
