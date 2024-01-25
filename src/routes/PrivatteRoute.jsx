import React from "react";
import useAuth from "../hooks/useAuth";
import Landing from "../pages/landing/landing/Landing";
import { Spinner } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";

const PrivatteRoute = ({ children }) => {
  const location = useLocation();
  console.log(location.pathname);
  const { loading, user, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!loading && !user && !isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }

  return children;
};
export default PrivatteRoute;
