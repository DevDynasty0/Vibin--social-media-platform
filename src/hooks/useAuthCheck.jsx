import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";
import { useCurrentUserMutation } from "../redux/features/user/userApi";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [currentUser] = useCurrentUserMutation();

  useEffect(() => {
    async function getUserAuth() {
      const res = await currentUser();
      const user = res?.data?.data;
      if (user) {
        dispatch(
          userLoggedIn({
            user: user.user,
            accessToken: user.accessToken,
          })
        );
        setUser(user.user);
      } else {
        setUser(null);
        dispatch(userLoggedOut());
      }
      setLoading(false);
    }

    getUserAuth();
  }, [dispatch, currentUser]);

  return { user, loading };
}
