import { createBrowserRouter } from "react-router-dom";
import {
  AuthLayout,
  BookingList,
  HomeLayout,
  SearchResult,
  ShopDetail,
  SubHome,
} from "../layouts";
import { Login, Register } from "../layouts/page";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "/shop/:id",
        element: <ShopDetail />,
      },
      { path: "/search", element: <SearchResult /> },
      { path: "/history", element: <BookingList /> },
      {
        path: "/",
        element: <SubHome />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    path: "/",
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
    ],
  },
]);
export default router;
