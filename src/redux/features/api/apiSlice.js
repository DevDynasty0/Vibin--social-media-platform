import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";
import getAccessToken from "../../../utils/getAccessToken";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const auth = await getAccessToken();
    if (auth?.accessToken) {
      headers.set("authorization", `Bearer ${auth.accessToken}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    const auth = await getAccessToken();

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
          `${import.meta.env.VITE_BASE_API_URL}/users/logout/${
            auth?.user?._id
          }`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        await logout.json();
        api.dispatch(userLoggedOut());
        localStorage.clear("auth");
        window.location.pathname = "/login";

        throw new Error("Network response was not ok");
      }

      const { data } = await response.json();
      if (data?.user) {
        localStorage.setItem("auth", JSON.stringify(data));
        api.dispatch(
          userLoggedIn({
            user: data.user,
            accessToken: data.accessToken,
          })
        );
        return await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  },
  endpoints: () => ({}),
});
