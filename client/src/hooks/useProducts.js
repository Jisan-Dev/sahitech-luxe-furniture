import { productsApi } from "@/lib/api";
import { useQueries, useQuery } from "@tanstack/react-query";

// Get a product
export const useProduct = (productId) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: () => productsApi.getAProduct(productId).then((res) => res.data.data),
  });
};

// Get all products with filters - USE IN: Home page
export const useHomepageProducts = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ["homepage-new-products"],
        queryFn: () => productsApi.getAllProducts({ limit: 4 }).then((res) => res.data.data),
      },
      {
        queryKey: ["homepage-featured-products"],
        queryFn: () =>
          productsApi.getAllProducts({ isFeatured: true, limit: 4 }).then((res) => res.data.data),
      },
      {
        queryKey: ["homepage-sale-products"],
        queryFn: () =>
          productsApi.getAllProducts({ inSale: true, limit: 4 }).then((res) => res.data.data),
      },
    ],
  });
  return results;
};
