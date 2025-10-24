import { publicApi } from "@/hooks/useAxios";

// Product Apis
export const productsApi = {
  getAllProducts: (params) => publicApi.get("/products", { params }),
  getAProduct: (productId) => publicApi.get(`/products/${productId}`),
};
