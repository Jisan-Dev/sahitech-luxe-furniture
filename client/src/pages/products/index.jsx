import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import ProductCard from "../../components/common/product-card";
import CategoryFilter from "./category-filter";
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

  // const filteredProducts = products.filter((product) => {
  //   const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
  //   const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  //apply price sorting to the filtered list
  // const sortedProducts = [...filteredProducts].sort((a, b) => {
  //   if (sortOption === "lowToHigh")
  //     return (a.salePrice ?? a.price ?? 0) - (b.salePrice ?? b.price ?? 0);
  //   if (sortOption === "highToLow")
  //     return (b.salePrice ?? b.price ?? 0) - (a.salePrice ?? a.price ?? 0);
  //   return 0; //default, no sorting
  // });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-muted">Loading Products...</p>
        </div>
      </div>
    );
  }

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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <div className="flex items-center space-x-3">
            {sortOption && (
              <label htmlFor="sort" className="text-sm text-muted-foreground">
                Sort by
              </label>
            )}
            {/* <select
              id="sort"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="rounded-md border bg-white px-3 py-2 text-sm">
              <option value="default" className="hover:!bg-red-100">
                Default
              </option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select> */}

            <Select onValueChange={setSortOption} value={sortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort Products" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Price Range</SelectLabel>
                  <SelectItem value="default" className="text-neutral-700">
                    Price: Random
                  </SelectItem>
                  <SelectItem value="price-asc" className="text-neutral-700">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-dsc" className="text-neutral-700">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="name" className="text-neutral-700">
                    Name: Alphabetic Order
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {products?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
