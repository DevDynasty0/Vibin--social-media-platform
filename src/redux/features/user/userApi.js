import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => ({
        url: "/users/current-user",
      }),
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/users/refresh-token",
        method: "POST",
      }),
    }),
    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/users/update-user-details",
        method: "PATCH",
        body: data,
      }),
    }),

    followUser: builder.mutation({
      query: (data) => ({
        url: "/users/follow-user",
        method: "POST",
        body: data,
      }),
    }),

    getSearchResult: builder.query({
      query: (searchInput) => ({
        url: `/users/search?query=${searchInput}`,
        method: "GET",
      }),
    }),

    getFollowingUsers: builder.query({
      query: () => ({
        url: `/users/get-following-users`,
        method: "GET",
      }),
    }),
    getFollowers: builder.query({
      query: () => ({
        url: `/users/get-followers`,
        method: "GET",
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useRefreshTokenMutation,
  useUpdateUserInfoMutation,
  useFollowUserMutation,
  useGetSearchResultQuery,
  useGetFollowingUsersQuery,
  useGetFollowersQuery,
  useGetUserByIdQuery,
} = userApi;
