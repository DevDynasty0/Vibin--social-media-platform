import { Navigate, useLocation } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Landing from "../pages/landing/landing/Landing";
import useAuthCheck from "../hooks/useAuthCheck";
import { Spinner } from "@chakra-ui/spinner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuthCheck();

  if (loading) {
    return (
      <div className="w-full flex justify-center items-center h-52 ">
        <Spinner />
      </div>
    );
  }

  if (!user) {
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
