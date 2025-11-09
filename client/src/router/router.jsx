import { createBrowserRouter } from "react-router";
import Main from "../layouts/main";
import AboutPage from "../pages/about-us";
import SigninPage from "../pages/auth/sign-in";
import SignUpPage from "../pages/auth/sign-up";
import CartPage from "../pages/cart";
import Checkout from "../pages/checkout";
import ContactPage from "../pages/contact";
import Homepage from "../pages/home";
import Orders from "../pages/orders";
import ProductDetails from "../pages/product-details";
import ProductsPage from "../pages/products";
import ProtectedRoute from "./protected-route";

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
        element: <SignUpPage />,
      },
      {
        path: "sign-in",
        element: <SigninPage />,
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    // auth related routes can go here
    path: "/auth",
    children: [
      {
        path: "sign-up",
        element: <SignUpPage />,
      },
    ],
  },
]);

export default router;
