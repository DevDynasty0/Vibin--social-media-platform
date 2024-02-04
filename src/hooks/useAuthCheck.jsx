import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");

    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.user) {
        dispatch(
          userLoggedIn({
            user: auth.user,
            accessToken: auth.accessToken,
          })
        );
        setUser(auth.user);
      }
    }
    setLoading(false);
  }, [dispatch, setUser]);

  return { user, loading, setUser  };
}
