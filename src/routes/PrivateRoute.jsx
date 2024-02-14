import { Navigate, useLocation } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import Landing from "../pages/landing/landing/Landing";
import useAuthCheck from "../hooks/useAuthCheck";
import { Spinner } from "@chakra-ui/spinner";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuthCheck();

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
