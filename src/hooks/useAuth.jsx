import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    axios
      .get("/api/v1/users/current-user")
      .then(({ data }) => {
        const user = data.data;
        if (user) {
          dispatch(userLoggedIn({ user }));
          console.log();
        } else {
          dispatch(userLoggedOut());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [dispatch]);
  return { loading, user, isAuthenticated };
};

export default useAuth;
