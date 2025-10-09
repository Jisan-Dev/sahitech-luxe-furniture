import { createBrowserRouter } from "react-router";
import Main from "./layouts/main";
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
    ],
  },
]);

export default router;
