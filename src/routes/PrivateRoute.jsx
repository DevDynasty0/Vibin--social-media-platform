import useAuth from "../hooks/useAuth";
import { Spinner } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import Landing from "../pages/landing/landing/Landing";
import PublicRoute from "./PublicRoute";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!loading && !isAuthenticated) {
    return (
      <PublicRoute>
        <Landing />
      </PublicRoute>
    );
  }

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
