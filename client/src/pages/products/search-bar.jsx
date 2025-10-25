import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
  return (
    <div className="mb-8">
      <form onSubmit={onSearch} className="relative max-w-md flex gap-2">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input name="search" type="text" placeholder="Search products..." className="pl-10" />
        <Button type="submit" className="">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </form>
    </div>
  );
}
