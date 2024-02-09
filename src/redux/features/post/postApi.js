import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts/get-followings-posts",
        method: "GET",
      }),
    }),
    getPostsByLoggedInUser: builder.query({
      query: ({userId}) => ({

        url: `/posts/get-posts/${userId}`,
       method:"GET",
      }),
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
      async onQueryStarted({ postId }, { getState, dispatch, queryFulfilled }) {
        const userEmail = getState()?.auth?.user?.email;

        // optimistic cache update start
        const patchResult = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const draftPost = draft.find((p) => p._id === postId);
            const isLikeExist = draftPost.likes.indexOf(userEmail);
            if (isLikeExist !== -1) {
              draftPost.likes.splice(isLikeExist, 1);
            } else {
              draftPost.likes.push(userEmail);
            }
          })
        );
        // optimistic cache update end

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation, useLikeMutation,useGetPostsByLoggedInUserQuery } =
  postApi;
  