import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CategoryFilter from "./category-filter";

export default function CategoryAndSortControl({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOption,
  setSortOption,
}) {
  return (
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
  );
}
