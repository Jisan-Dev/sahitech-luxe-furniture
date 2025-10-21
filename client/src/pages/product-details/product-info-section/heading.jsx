export default function Heading({ productCategory, productName }) {
  return (
    <div className="mb-4">
      <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
        {productCategory}
      </p>
      <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
        {productName}
      </h1>
    </div>
  );
}
