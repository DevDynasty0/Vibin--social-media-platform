import { useEffect, useState } from "react";
import { useCurrentUserQuery } from "../redux/features/user/userApi";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";

export default function useAuthCheck() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { data: currentUser, isSuccess } = useCurrentUserQuery();

  useEffect(() => {
    const getAwait = async () => {
      if (isSuccess) {
        setUser(currentUser.data.user);
        dispatch(userLoggedIn({ user: currentUser.data.user }));
      }
    };
    getAwait();
    setLoading(false);
  }, [isSuccess, currentUser, dispatch]);

  return { user, loading };
}
