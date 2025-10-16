import { clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function onAddToFavorites(product) {
  console.log(`Added ${product.name} to favorites!`);
  toast.success(`${product.name} added to favorites!`, {
    description: "You can view your favorite products in your profile.",
    duration: 4000,
    classNames: {
      toast: "toast",
      title: "text-sm !font-bold",
      description: "description",
      actionButton: "action-button",
      cancelButton: "cancel-button",
      closeButton: "close-button",
    },
  });
}

export function handleAddToCart(product) {
  toast.success(`${product.name} added to cart!`, {
    description: `Price: $${product.price}`,
  });
}
