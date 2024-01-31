import { Spinner } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import Landing from "../pages/landing/landing/Landing";
import PublicRoute from "./PublicRoute";
import useAuthCheck from "../hooks/useAuthCheck";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useAuthCheck();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!loading && !user) {
    return (
      <PublicRoute>
        <Landing />
      </PublicRoute>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
