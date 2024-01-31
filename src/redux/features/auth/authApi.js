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
          const userEmail = result?.data?.data?.user.email;

          if (userEmail) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                user: result.data.data.user,
              })
            );
            dispatch(
              userLoggedIn({
                user: result.data.data.user,
              })
            );
          }
        } catch (err) {
          // do nothing
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
          const userEmail = result?.data?.data?.user.email;

          if (userEmail) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                user: result.data.data.user,
              })
            );
            dispatch(
              userLoggedIn({
                user: result.data.data.user,
              })
            );
          }
        } catch (err) {
          // do nothing
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
          const userEmail = result?.data?.data?.user.email;

          if (userEmail) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                user: result.data.data.user,
              })
            );
            dispatch(
              userLoggedIn({
                user: result.data.data.user,
              })
            );
          }
        } catch (err) {
          // do nothing
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
