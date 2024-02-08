import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    currentUser: builder.mutation({
      query: (id) => ({
        url: "/users/current-user",
        method: "POST",
        body: id,
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
  }),
});

export const {
  useCurrentUserMutation,
  useUpdateUserInfoMutation,
  useGetSearchResultQuery,
} = userApi;
