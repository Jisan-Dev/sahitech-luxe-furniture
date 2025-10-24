import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import CartProvider from "@/contexts/cart-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, ScrollRestoration } from "react-router";

// Create a client
const queryClient = new QueryClient();

export default function Main() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <ScrollRestoration />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </CartProvider>
    </QueryClientProvider>
  );
}
