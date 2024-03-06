import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = JSON.parse(localStorage.getItem("auth"))?.accessToken;
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
          credentials: "include",
        }
      );

      if (!response.ok) {
        const user = await JSON.parse(localStorage.getItem("auth"));
        await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/users/logout/${user.user._id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        api.dispatch(userLoggedOut());
        localStorage.clear("auth");

        window.location.reload();
        throw new Error("Network response was not ok");
      }

      const { data } = await response.json();
      if (data?.user) {
        api.dispatch(
          userLoggedIn({
            user: data.user,
          })
        );
        localStorage.setItem("auth", JSON.stringify(data.user._id));
        return await baseQuery(args, api, extraOptions);
      }
    }

    return result;
  },
  endpoints: () => ({}),
});
