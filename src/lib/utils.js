import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function onAddToFavorites(product) {
  console.log(`Added ${product.name} to favorites!`);
}
