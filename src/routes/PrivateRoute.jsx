import { Spinner } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";

import PublicRoute from "./PublicRoute";

import Landingx from "../pages/landing/landing/Landingx";
import useAuthCheck from "../hooks/useAuthCheck";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useAuthCheck();
  console.log(user);
  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  // if (loading && !user) {
  //   return (
  //     <div className="w-full flex justify-center items-center h-52 ">
  //       {/* <Spinner /> */} loading 2
  //     </div>
  //   );
  // }

  if (!user) {
    return (
      <PublicRoute>
        <Landingx />
      </PublicRoute>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
