import { handleAddToCart } from "@/lib/utils";
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);

  const addToCart = (product) => {
    setCart(handleAddToCart(product));
  };

  const value = { cart, setCart, addToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = () => useContext(CartContext);

// eslint-disable-next-line react-refresh/only-export-components
export { CartContext, useCart };
export default CartProvider;
