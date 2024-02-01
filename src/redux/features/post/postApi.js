import { apiSlice } from "../api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts/get-followings-posts",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? result.map((post) => ({ type: "Posts", id: post._id }))
          : ["Posts"],
    }),
    like: builder.mutation({
      query: ({ postId }) => ({
        url: `/posts/like/${postId}`,
        method: "PATCH",
      }),
      invalidatesTags: (data) => [{ type: "Posts", id: data._id }],
    }),
  }),
});

export const { useGetPostsQuery, useLikeMutation } = authApi;
