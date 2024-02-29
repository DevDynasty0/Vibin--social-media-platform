import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  credentials: "include",
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const user = api.getState().auth?.user;

    if (result?.error?.originalStatus === 401) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/users/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        const logout = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/users/logout/${user._id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        await logout.json();
        api.dispatch(userLoggedOut());
        window.location.pathname = "/login";

        throw new Error("Network response was not ok");
      }

      const { data } = await response.json();
      if (data?.user) {
        api.dispatch(
          userLoggedIn({
            user: data.user,
          })
        );
        return await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  },
  endpoints: () => ({}),
});
