import ProductCard from "../../components/common/product-card";

export default function FeaturedProducts({ products }) {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Collection
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
            Handpicked pieces that define contemporary elegance
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
