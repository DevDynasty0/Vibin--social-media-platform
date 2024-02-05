import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const InfoRouteHandle = ({ children }) => {
  const isModalOpen = useSelector((state) => state.user.isModalOpen);

  return isModalOpen ? children : <Navigate to="/" replace={true}></Navigate>;
};

export default InfoRouteHandle;
