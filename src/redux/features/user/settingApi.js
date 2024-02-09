import { apiSlice } from "../api/apiSlice";

export const settingApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    unfollowUser: builder.mutation({
        query: (data) => ({
           url: `/settings/deleteFollower`,
           method: "DELETE",
           body: data
        }),
    })
  }),
});

export const { useUnfollowUserMutation } = settingApi;