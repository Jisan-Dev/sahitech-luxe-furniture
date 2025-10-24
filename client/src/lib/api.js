import { publicApi } from "@/hooks/useAxios";

// Product Apis
export const productsApi = {
  getAllProducts: (params) => publicApi.get("/products", { params }),
};
