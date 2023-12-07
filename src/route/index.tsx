import { createBrowserRouter } from "react-router-dom";
import { HomeLayout, ShopDetail, SubHome } from "../layouts";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/detail",
        element: <ShopDetail />,
      },
      {
        path: "/",
        element: <SubHome />,
      },
    ],
  },
]);
export default router;
