import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => ({
        url: "/users/current-user",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const userData = result?.data?.data?.user;
          if (userData?._id) {
            dispatch(
              userLoggedIn({
                user: userData,
              })
            );
          }
        } catch (err) {
          dispatch(userLoggedOut());
        }
      },
    }),
    suggestedUsers: builder.query({
      query: () => ({
        url: "/users/suggested-users",
        method: "GET",
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
  useUpdateUserInfoMutation,
  useFollowUserMutation,
  useGetSearchResultQuery,
  useGetFollowingUsersQuery,
  useGetFollowersQuery,
  useGetUserByIdQuery,
  useSuggestedUsersQuery,
} = userApi;
