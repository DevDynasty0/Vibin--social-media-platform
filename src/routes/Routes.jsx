import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/login/Login";
import SignUp from "../pages/sign-up/SignUp";
import Home from "../pages/home/home/Home";
import Landing from "../pages/landing/landing/Landing";
import NotFound from "../pages/not-found/NotFound";
import Settings from "../pages/home/settings/Settings";
import Profile from "../pages/profile/Profile";
import PrivatteRoute from "./PrivatteRoute";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "settings",
        element: (
          <PrivatteRoute>
            <Settings />{" "}
          </PrivatteRoute>
        ),
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <PrivatteRoute>
        <Profile />{" "}
      </PrivatteRoute>
    ),
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

export default Routes;
