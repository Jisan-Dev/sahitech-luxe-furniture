import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import ProductCard from "../../components/common/product-card";
import CategoryAndSortControl from "./category-and-sort-control";
import Header from "./header";
import SearchBar from "./search-bar";

const categories = ["All", "Sofas", "Chairs", "Tables", "Beds"];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const {
    data: products,
    isLoading,
    isError,
    isPaused,
  } = useProducts({
    category: selectedCategory.toLocaleLowerCase(),
    search: searchQuery,
    sort: sortOption,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchTerm = form.search.value;
    setSearchQuery(searchTerm);
  };

  if (sortOption === "price-asc")
    products?.sort((a, b) => (a.salePrice || a.price || 0) - (b.salePrice || b.price || 0));
  if (sortOption === "price-dsc")
    products?.sort((a, b) => (b.salePrice || b.price || 0) - (a.salePrice || a.price || 0));
  // if (sortOption === "name") products.sort((a, b) => a.name.localeCompare(b.name));

  // if (isLoading) return <Loader items="products" />;

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500 text-lg">Error loading products. Please try again later.</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <Header />

        {/* Search Bar */}
        <SearchBar onSearch={handleSearch} />

        {/* Category Filter + Sort control */}
        <CategoryAndSortControl
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        {/* Products Grid */}
        {isLoading ? (
          <h5 className="text-center font-medium py-12 italic">Loading Products...</h5>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Something went wrong. Please try again later</p>
          </div>
        )}

        {isPaused && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              You are offline. Please check your internet connection.
            </p>
          </div>
        )}

        {products?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
