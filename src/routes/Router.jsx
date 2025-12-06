import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../auth/Register";
import Login from "../auth/Login";


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

]);