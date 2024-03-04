import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrentUserQuery } from "../redux/features/user/userApi";
import { userLoggedIn } from "../redux/features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { data: currentUser, isSuccess } = useCurrentUserQuery();

  useEffect(() => {
    const localAuth = localStorage?.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      setUser(auth);
    }
    setLoading(false);
  }, [dispatch, setUser]);

  useEffect(() => {
    if (isSuccess && currentUser?.data?.user) {
      dispatch(
        userLoggedIn({
          user: currentUser.data.user,
        })
      );
    }
  }, [isSuccess, dispatch, currentUser]);

  return { user, loading };
}
