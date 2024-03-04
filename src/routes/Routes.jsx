import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import Home from "../pages/home/home/Home";
import ErrorPageNew from "../pages/not-found/ErrorPageNew";
import Settings from "../pages/home/settings/Settings";
import Profile from "../pages/profile/Profile";
import Friends from "../pages/friends/Friends";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Info from "../pages/info/Info";
import InfoRouteHandle from "./InfoRouteHandle";
import SearchResult from "../pages/search/SearchResult";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../pages/adminDashboardPages/adminDashboard/AdminDashboard";
import AllUsers from "../pages/adminDashboardPages/allUsers/AllUsers";
import SuspendedUsers from "../pages/adminDashboardPages/suspendedUsers/SuspendedUsers";
import ShowSavePosts from "../pages/profile/ShowSavePosts";
import Trending from "../pages/Trending/Trending";
import Videos from "../pages/Videos/Videos";
import GenarateCaption from "../shared component/viben-ai/GenarateCaption";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPageNew></ErrorPageNew>,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },

      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        ),
      },
      {
        path: "friends",
        element: (
          <PrivateRoute>
            <Friends />
          </PrivateRoute>
        ),
      },
      {
        path: "videos",
        element: (
          <PrivateRoute>
            <Videos></Videos>
          </PrivateRoute>
        ),
      },
      {
        path: "trending",
        element: (
          <PrivateRoute>
            <Trending />
          </PrivateRoute>
        ),
      },
      {
        path: "vibinai",
        element: (
          <PrivateRoute>
            <GenarateCaption></GenarateCaption>
          </PrivateRoute>
        ),
      },
      {
        path: "search",
        element: (
          <PrivateRoute>
            <SearchResult />
          </PrivateRoute>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/savePost",
        element: (
          <PrivateRoute>
            <ShowSavePosts></ShowSavePosts>
          </PrivateRoute>
        ),
      },
      {
        path: "info",
        element: (
          <InfoRouteHandle>
            <Info />
          </InfoRouteHandle>
        ),
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminDashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/admin/allUsers",
        element: <AllUsers />,
      },
      {
        path: "/admin/suspendedUsers",
        element: <SuspendedUsers />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
]);

export default Routes;
