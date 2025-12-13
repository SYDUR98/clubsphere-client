import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import CreateClubs from "../pages/Dashboard/Manager/CreateClubs";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyClubs from "../pages/Dashboard/Manager/MyClubs";
// import MyEvent from "../pages/Dashboard/Manager/ManageClubs";
import AdminHome from "../pages/Dashboard/Admin/AdminHome";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import ManageClubs from "../pages/Dashboard/Admin/ManageClubs";
import BrowseClubs from "../pages/Clubs/BrowseClubs";
import PaymentSuccess from "../pages/Dashboard/Member/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Member/PaymentCancelled";
import MemberEvents from "../pages/Dashboard/Member/MemberEvents";
import EventPaymentSuccess from "../pages/Dashboard/Member/EventPaymentSuccess";
import MemberStats from "../pages/Dashboard/Member/MemberStats";
import MemberClubs from "../pages/Dashboard/Member/MemberClubs";
import ClubDetails from "../pages/Clubs/ClubDetails";
import JoinClubEvent from "../pages/Dashboard/Member/JoinClubEvent";
import ManagerOverview from "../pages/Dashboard/Manager/ManagerOverview";
import AdminRoute from "./AdminRoute";
import ManagerRoute from "./ManagerRoute";
import AdminPayments from "../pages/Dashboard/Admin/AdminPayments";
import MemberRoute from "./MemberRoute";
import MyMemberEvents from "../pages/Dashboard/Member/MyMemberEvents";
import MemberPayments from "../pages/Dashboard/Member/MemberPayments";
import ManagerClubMembers from "../pages/Dashboard/Manager/ManagerClubMembers";
import CreateEvent from "../pages/Dashboard/Manager/CreateEvent";
import ManagerAllEvents from "../pages/Dashboard/Manager/ManagerAllEvents";
import EventDetails from "../pages/Dashboard/Member/EventDetails";
import ErrorPage from "../components/Shared/ErrorPage";
import EventRegistrations from "../pages/Dashboard/Manager/EventRegistrations";

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
        path:'*',
        Component:ErrorPage,
      },
      {
        path: "browse-clubs",
        Component: BrowseClubs,
      },
     
      {
        path: "/my-event",
        Component: MyMemberEvents
      },
      {
        path: "/my-event/:id",
        Component: EventDetails
      },

      {
        path: "/clubs/:id",
        element: <ClubDetails></ClubDetails>,
      },
       {
        path: "event/clubs/:clubId",
        element:<JoinClubEvent></JoinClubEvent>
      },
     
      {
        path: "member/events",
        element: (
          
            <MemberEvents></MemberEvents>
         
        ),
        // element: <MemberEvents></MemberEvents>
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
        path: "admin/home",
        element: (
          <AdminRoute>
            <AdminHome></AdminHome>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "admin/manage-clubs",
        element: (
          <AdminRoute>
            <ManageClubs></ManageClubs>
          </AdminRoute>
        ),
      },
      {
        path: "admin/payment-history",
        element: (
          <AdminRoute>
            <AdminPayments></AdminPayments>
          </AdminRoute>
        ),
      },

      //manager route
      {
        path: "manager/overview",
        element: (
          <ManagerRoute>
            <ManagerOverview></ManagerOverview>
          </ManagerRoute>
        ),
      },
      {
        path: "manager/createclubs",
        element: (
          <ManagerRoute>
            <CreateClubs></CreateClubs>
          </ManagerRoute>
        ),
      },
      {
        path: "manager/createEvents",
        element: (
          <ManagerRoute>
            <CreateEvent></CreateEvent>
          </ManagerRoute>
        ),
      },
      {
        path: "manager/my-clubs",
        element: (
          <ManagerRoute>
            <MyClubs></MyClubs>
          </ManagerRoute>
        ),
        // Component: MyClubs,
      },
      {
        path: "manager/all/events",
        element: (
          <ManagerRoute>
            <ManagerAllEvents></ManagerAllEvents>
          </ManagerRoute>
        ),
        // Component: MyClubs,
      },
     
      {
        path: "manager-members",
        element: (
          <ManagerRoute>
            <ManagerClubMembers></ManagerClubMembers>
          </ManagerRoute>
        ),
        // Component: MyEvent,
      },
      {
        path: "manager/events/registrations",
        element: (
          <ManagerRoute>
            <EventRegistrations></EventRegistrations>
          </ManagerRoute>
        ),
        // Component: MyEvent,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "event/payment-success",
        Component: EventPaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
      // member routes

      {
        path: "member/stats",
        element: (
          <MemberRoute>
            <MemberStats></MemberStats>
          </MemberRoute>
        ),
        // element: <MemberStats></MemberStats>,
      },
      {
        path: "member/clubs",
        element: (
          <MemberRoute>
            <MemberClubs></MemberClubs>
          </MemberRoute>
        ),
        // element: <MemberClubs></MemberClubs>,
      },
      
      // okay on change

      // {
      //   path: "member/event/clubs/:clubId",
      //   element:<JoinClubEvent></JoinClubEvent>
      // },
      {
        path: "member/all/payments",
        element:<MemberRoute>
            <MemberPayments></MemberPayments>
        </MemberRoute>
      },
    ],
  },
]);
