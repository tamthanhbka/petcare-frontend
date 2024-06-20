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
import {
  BookingRequest,
  CreateService,
  Dashboard,
  ListCustomer,
  ListMessage,
  ListService,
  ReadService,
  ShopInfo,
  StaffHomeLayout,
} from "../layouts/staff";
import ProtectedRoute from "./ProtectedRoute";
import {
  AdminDashBoard,
  AdminHome,
  AdminListCustomer,
  AdminListRequest,
  AdminListService,
  AdminListShop,
} from "../layouts/admin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        path: "shop/:id",
        element: <ShopDetail />,
      },
      { path: "search", element: <SearchResult /> },
      {
        path: "history",
        element: (
          <ProtectedRoute roles={["user"]}>
            <BookingList />
          </ProtectedRoute>
        ),
      },
      { path: "message", element: <ListMessage /> },
      {
        path: "",
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
  {
    element: (
      <ProtectedRoute roles={["staff"]}>
        <StaffHomeLayout />
      </ProtectedRoute>
    ),
    path: "/staff",
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      { path: "shop", element: <ShopInfo /> },
      {
        path: "services",
        children: [
          { path: "", element: <ListService /> },
          {
            path: "add",
            element: <CreateService />,
          },
          {
            path: ":id",
            element: <ReadService />,
          },
        ],
      },
      {
        path: "bookings",
        element: <BookingRequest />,
      },
      {
        path: "chats",
        element: <ListMessage />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <AdminHome />
      </ProtectedRoute>
    ),
    children: [
      { path: "dashboard", element: <AdminDashBoard /> },
      { path: "shops", element: <AdminListShop /> },
      { path: "customers", element: <AdminListCustomer /> },
      { path: "services", element: <AdminListService /> },
      { path: "requests", element: <AdminListRequest /> },
    ],
  },
]);
export default router;
