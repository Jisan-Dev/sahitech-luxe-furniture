import { Link } from "react-router";

const categories = [
  {
    name: "Sofas",
    image: "/modern-luxury-sofa.jpg",
    count: "24 items",
  },
  {
    name: "Chairs",
    image: "/elegant-dining-chair.png",
    count: "18 items",
  },
  {
    name: "Tables",
    image: "/modern-coffee-table.png",
    count: "15 items",
  },
  {
    name: "Beds",
    image: "/luxury-bed-frame.png",
    count: "12 items",
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/products?category=${category.name.toLowerCase()}`}
              className="group">
              <div className="relative overflow-hidden rounded-lg bg-card aspect-square">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="font-serif text-xl md:text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-sm text-white/80">{category.count}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
