import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn, userLoggedOut } from "../redux/features/auth/authSlice";
import {
  // useCurrentUserMutation,
  useCurrentUserQuery,
} from "../redux/features/user/userApi";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { data: currentUser } = useCurrentUserQuery();
  useEffect(() => {
    if (currentUser) {
      setUser(currentUser.data.user);
      // console.log(currentUser.data.accessToken);
      dispatch(
        userLoggedIn({
          user: currentUser.data.user,
          accessToken: currentUser.data.accessToken,
        })
      );
      setUser(currentUser.data.user);
      setLoading(false);
    } else {
      setLoading(false);
      dispatch(userLoggedOut());
    }
  }, [dispatch, currentUser]);

  return { user, loading };
}
