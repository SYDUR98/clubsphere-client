import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import CreateClubs from "../pages/Dashboard/Manager/CreateClubs";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children:[
        {
            index:true,
            Component:Home
        },
        {
            path:'register',
            Component:Register
        },
        {
            path:'login',
            Component:Login
        },
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoute>
        <DashboardLayout></DashboardLayout>
    </PrivateRoute>,
    children:[
      {
        path:'/dashboard/manager/createclubs',
        Component:CreateClubs
      },
    ]
  }


]);