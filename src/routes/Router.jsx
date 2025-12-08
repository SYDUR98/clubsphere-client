import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import CreateClubs from "../pages/Dashboard/Manager/CreateClubs";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyClubs from "../pages/Dashboard/Manager/MyClubs";
import MyEvent from "../pages/Dashboard/Manager/MyEvent";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "login",
        Component: Login,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/admin/home",
        Component: AdminHome,
      },
      {
        path: "/dashboard/admin/manage-users",
        Component:ManageUsers
      },
      {
        path: "/dashboard/manager/createclubs",
        Component: CreateClubs,
      },
      {
        path: "/dashboard/manager/my-clubs",
        Component: MyClubs,
      },
      {
        path: "/dashboard/manager/my-events",
        Component: MyEvent,
      },
    ],
  },
]);
