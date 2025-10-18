import { createBrowserRouter } from "react-router";
import Main from "./layouts/main";
import AboutPage from "./pages/about-us";
import CartPage from "./pages/cart";
import ContactPage from "./pages/contact";
import Homepage from "./pages/home";
import ProductDetails from "./pages/product-details";
import ProductsPage from "./pages/products";
import Register from "./pages/sign-up/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "about-us",
        element: <AboutPage />,
      },
      {
        path: "sign-up",
        element: <Register />,
      },
    ],
  },
]);

export default router;
