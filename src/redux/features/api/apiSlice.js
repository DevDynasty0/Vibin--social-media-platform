import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedOut } from "../auth/authSlice";
import getAccessToken from "../../../utils/getAccessToken";

const baseQuery = fetchBaseQuery({
  // baseUrl: import.meta.env.VITE_BASE_API_URL,
  baseUrl: "https://vibin-c5r0.onrender.com/api/v1",
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
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
      api.dispatch(userLoggedOut());
      localStorage.clear();
    }
    return result;
  },
  endpoints: () => ({}),
});
