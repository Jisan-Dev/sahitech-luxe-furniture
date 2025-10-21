import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import CartProvider from "@/contexts/cart-context";
import { Outlet, ScrollRestoration } from "react-router";

export default function Main() {
  return (
    <CartProvider>
      <ScrollRestoration />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </CartProvider>
  );
}
