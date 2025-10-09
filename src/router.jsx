import { createBrowserRouter } from "react-router";
import Main from "./layouts/main";
import Homepage from "./pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);

export default router;
