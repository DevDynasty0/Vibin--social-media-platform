import useAuthCheck from "../hooks/useAuthCheck";
import Landing from "../pages/landing/landing/Landing";
import PublicRoute from "./PublicRoute";
import { Spinner } from "@chakra-ui/react";

const PrivateRoute = ({ children }) => {
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

  return children;
};

export default PrivateRoute;
