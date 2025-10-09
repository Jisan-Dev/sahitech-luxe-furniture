import { createBrowserRouter } from "react-router";
import Main from "./layouts/main";
import ContactPage from "./pages/contact";
import Homepage from "./pages/home";
import ProductDetails from "./pages/product-details";

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
        path: "products/:id",
        element: <ProductDetails />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
    ],
  },
]);

export default router;
