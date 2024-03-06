import { useCurrentUserQuery } from "../redux/features/user/userApi";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../redux/features/auth/authSlice";

const useGetCurrentUser = (user) => {
  const {
    data: currentUser,
    isSuccess,
    isLoading,
  } = useCurrentUserQuery({}, { skip: !user });
  const dispatch = useDispatch();
  if (isLoading) {
    return;
  }
  if (isSuccess && currentUser?.data?.user) {
    dispatch(
      userLoggedIn({
        user: currentUser.data.user,
      })
    );
  }
  return;
};

export default useGetCurrentUser;
