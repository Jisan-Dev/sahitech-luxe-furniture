import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import { Outlet, ScrollRestoration } from "react-router";

export default function Main() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
