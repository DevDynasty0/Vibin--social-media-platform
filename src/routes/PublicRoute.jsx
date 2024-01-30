import { Spinner } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import useAuthCheck from "../hooks/useAuthCheck";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { loading, user } = useAuthCheck();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return children;
  }

  return <Navigate to="/home" state={{ from: location }} replace></Navigate>;
};

export default PublicRoute;
