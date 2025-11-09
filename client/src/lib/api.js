import { privateApi, publicApi } from "@/hooks/useAxios";

// Product Apis
export const productsApi = {
  getAllProducts: (params) => publicApi.get("/products", { params }),
  getAProduct: (productId) => publicApi.get(`/products/${productId}`),
};

// auth apis
export const authApi = {
  registerUser: (userData) => publicApi.post("/auth/register", userData),
  loginUser: (userData) => publicApi.post("/auth/login", userData),
};

// order apis
export const ordersApi = {
  getAllOrders: () => privateApi.get("/orders"),
  getOrder: (orderId) => privateApi.get(`/orders/${orderId}`),
  createOrder: (orderData) => privateApi.post("/orders", orderData),
};
