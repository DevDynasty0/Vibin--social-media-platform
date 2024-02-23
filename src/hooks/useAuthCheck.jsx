import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";
import {
  useCurrentUserQuery,
  useRefreshTokenMutation,
} from "../redux/features/user/userApi";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [refreshToken] = useRefreshTokenMutation();
  const { error } = useCurrentUserQuery();
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

    const getRefreshToken = async () => {
      if (error && error.originalStatus === 401) {
        const refreshT = await refreshToken();
        const userData = refreshT?.data?.data;

        if (userData) {
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: userData.accessToken,
              user: userData.user,
            })
          );
          dispatch(userLoggedIn(userData));
        }
      }
    };
    getRefreshToken();
  }, [dispatch, refreshToken, error]);

  return { user, loading };
}
