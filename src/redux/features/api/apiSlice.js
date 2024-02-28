import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getAccessToken from "../../../utils/getAccessToken";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    const token = await getAccessToken();
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.originalStatus === 401) {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/users/refresh-token`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        api.dispatch(userLoggedOut());
        localStorage.clear("auth");
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
