import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/users/update-user-details",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const { useUpdateUserInfoMutation } = userApi;
