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
    createPost: builder.mutation({
      query: ({ newPost }) => ({
        url: "/posts/post",
        method: "POST",
        body: newPost,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
      }),
      // invalidatesTags: (data) => [{ type: "Posts", id: data._id }],
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

export const { useGetPostsQuery, useCreatePostMutation, useLikeMutation } =
  authApi;
