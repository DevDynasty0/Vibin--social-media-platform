import React, { useEffect } from 'react';
import { useCurrentUserQuery } from '../redux/features/user/userApi';
import { useDispatch } from 'react-redux';
import { userLoggedIn } from '../redux/features/auth/authSlice';

const useGetCurrentUser = () => {

    const { data: currentUser, isSuccess, isLoading } = useCurrentUserQuery();
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