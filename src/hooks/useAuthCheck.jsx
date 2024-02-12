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
    const localAuth = localStorage?.getItem("auth");
    const auth = JSON.parse(localAuth);
    async function getUserAuth() {
      if (auth?.user) {
        await currentUser({ _id: auth.user._id });
        dispatch(
          userLoggedIn({
            user: auth.user,
            accessToken: auth.accessToken,
          })
        );
        setUser(auth.user);
        setLoading(false);
      } else {
        setLoading(false);
        dispatch(userLoggedOut());
      }
    }

    getUserAuth();
  }, [dispatch, currentUser]);

  return { user, loading };
}
