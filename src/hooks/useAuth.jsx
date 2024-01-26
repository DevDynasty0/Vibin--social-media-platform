import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/authSlice";

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(user);

  useEffect(() => {
    axios
      .get("/api/v1/users/current-user")
      .then(({ data }) => {
        const user = data.data;
        console.log(user);
        if (user) {
          dispatch(login({ user }));
          console.log();
        } else {
          dispatch(logout());
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [dispatch]);
  return { loading, user, isAuthenticated };
};

export default useAuth;
