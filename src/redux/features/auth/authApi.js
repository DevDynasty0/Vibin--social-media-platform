import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerApi: builder.mutation({
      query: (data) => ({
        url: "/users/register",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const userData = result?.data?.data;

          if (userData?.user?.email) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: userData.accessToken,
                user: userData.user,
              })
            );
            dispatch(
              userLoggedIn({
                user: userData.user,
                accessToken: userData.accessToken,
              })
            );
          }
        } catch (err) {
          // do nothing
          console.log(err);
        }
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const userData = result?.data?.data;

          if (userData?.user?.email) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: userData.accessToken,
                user: userData.user,
              })
            );
            dispatch(
              userLoggedIn({
                user: userData.user,
                accessToken: userData.accessToken,
              })
            );
          }
        } catch (err) {
          // do nothing
          console.log(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/users/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            localStorage.clear("auth");
            dispatch(userLoggedOut());
          }
        } catch (err) {
          // do nothing
        }
      },
    }),
    googleLogin: builder.mutation({
      query: (data) => ({
        url: "/users/google-login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const userData = result?.data?.data;

          if (userData?.user?.email) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: userData.accessToken,
                user: userData.user,
              })
            );
            dispatch(
              userLoggedIn({
                user: userData.user,
                accessToken: userData.accessToken,
              })
            );
          }
        } catch (err) {
          // do nothing
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterApiMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
} = authApi;
