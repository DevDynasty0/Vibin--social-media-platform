import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import Home from "../pages/home/home/Home";
import NotFound from "../pages/not-found/NotFound";
import Settings from "../pages/home/settings/Settings";
import Profile from "../pages/profile/Profile";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
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
        path: "/home",
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
    ],
  },
  {
    path: "/profile",
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
