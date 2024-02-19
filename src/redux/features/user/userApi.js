import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.mutation({
      query: () => ({
        url: "/users/current-user",
        method: "PATCH",
      }),
    }),

    updateUserInfo: builder.mutation({
      query: (data) => ({
        url: "/users/update-user-details",
        method: "PATCH",
        body: data,
      }),
    }),

    getSearchResult: builder.query({
      query: (searchInput) => ({
        url: `/users/search?query=${searchInput}`,
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
  useCurrentUserMutation,
  useUpdateUserInfoMutation,
  useGetSearchResultQuery,
  useGetUserByIdQuery,
} = userApi;
