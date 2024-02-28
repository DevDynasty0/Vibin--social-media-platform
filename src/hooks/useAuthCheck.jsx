import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    const auth = JSON.parse(localAuth);

    if (auth?.user) {
      dispatch(
        userLoggedIn({
          user: auth.user,
          accessToken: auth.accessToken,
        })
      );
      setUser(auth.user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
      dispatch(userLoggedOut());
    }
  }, [dispatch]);

  return { user, loading };
}
