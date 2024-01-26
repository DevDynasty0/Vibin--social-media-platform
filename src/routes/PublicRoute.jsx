import useAuth from "../hooks/useAuth";
import { Spinner } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return children;
  }

  return <Navigate to="/home" state={{ from: location }} replace></Navigate>;
};

export default PublicRoute;
