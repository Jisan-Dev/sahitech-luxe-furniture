import { ordersApi } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Create order - USE IN: Checkout page (final step)
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ordersApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Order placed successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to place order");
    },
  });
};
