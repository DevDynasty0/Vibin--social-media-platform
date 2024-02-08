import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import Home from "../pages/home/home/Home";
// import NotFound from "../pages/not-found/NotFound";
import ErrorPageNew from "../pages/not-found/ErrorPageNew";
import Settings from "../pages/home/settings/Settings";
import Profile from "../pages/profile/Profile";
import Friends from "../pages/friends/Friends";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// import Profile2 from "../pages/profile/Profile2";
import Info from "../pages/info/Info";
import InfoRouteHandle from "./InfoRouteHandle";
import SearchResult from "../pages/search/SearchResult";

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
        element: <Friends />,
      },
      {
        path: "search",
        element: <SearchResult />,
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
    path: "/profile/:id",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
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
