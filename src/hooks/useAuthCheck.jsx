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
    console.log(localAuth);
    if (localAuth) {
      const auth = JSON.parse(localAuth);

      if (auth?.user) {
        currentUser({ _id: auth.user._id })
          .then((res) => {
            // console.log(res.data, "current api triggered");
            if (res.data) {
              dispatch(
                userLoggedIn({
                  user: auth.user,
                  accessToken: auth.accessToken,
                })
              );
              setUser(auth.user);

              setLoading(false);
            }
          })
          .finally(console.log("user"));
      }
    } else {
      setLoading(false);
      dispatch(userLoggedOut());
    }
  }, [dispatch, setUser, currentUser]);

  return { user, loading };
}
