import { comment } from "postcss";
import { apiSlice } from "../api/apiSlice";

export const postApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: "/posts/get-followings-posts",
        method: "GET",
      }),
    }),
    getPostsByUserId: builder.query({
      query: ({ userId }) => ({
        url: `/posts/get-posts/${userId}`,
        method: "GET",
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
      async onQueryStarted(
        { postId, userId },
        { getState, dispatch, queryFulfilled }
      ) {
        const userEmail = getState()?.auth?.user?.email;

        // optimistic cache update for liking start
        const likeForHomePost = dispatch(
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
        const likeForProfilePost = dispatch(
          postApi.util.updateQueryData(
            "getPostsByUserId",
            { userId },
            (draft) => {
              const draftPost = draft.find((p) => p._id === postId);
              const isLikeExist = draftPost.likes.indexOf(userEmail);
              if (isLikeExist !== -1) {
                draftPost.likes.splice(isLikeExist, 1);
              } else {
                draftPost.likes.push(userEmail);
              }
            }
          )
        );
        // optimistic cache update for liking end

        try {
          await queryFulfilled;
        } catch (error) {
          likeForHomePost.undo();
          likeForProfilePost.undo();
        }
      },
    }),
    sharePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/posts/create-post-share/${postId}`,
        method: "PATCH",
      }),
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: "/comments/comment",
        method: "POST",
        body: data,
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        try {
          const { data: postComment } = await queryFulfilled;
          if (postComment?.data?._id) {
            dispatch(
              postApi.util.updateQueryData("getPosts", undefined, (draft) => {
                const draftPost = draft.find((p) => p._id === postId);
                draftPost.comments += 1;
              })
            );
            dispatch(
              postApi.util.updateQueryData(
                "getComments",
                { postId },
                (draft) => {
                  draft.data.unshift(postComment.data);
                }
              )
            );
          }
        } catch {
          console.log("error from postApi on createComment: ");
        }
      },
    }),

    deleteComment: builder.mutation({
      query: ({ commentId, postId }) => ({
        url: `/comments/comment/${commentId}/${postId}`,
        method: "DELETE",


      }),
      async onQueryStarted({ postId, commentId }, { dispatch, queryFulfilled }) {
        try {
          const { data: postComment } = await queryFulfilled;
          // console.log('postcomment',postComment);
          if (postComment?.data?.deletedCount
          ) {
            dispatch(
              postApi.util.updateQueryData("getPosts", undefined, (draft) => {
                const draftPost = draft.find((p) => p._id === postId);
                draftPost.comments -= 1;
              })
            );
            dispatch(
              postApi.util.updateQueryData(
                "getComments",

                { postId },
                (draft) => {

                  // const draftPost = draft.data.find((p) => p._id === commentId);
                  // const isCommentExist = draftPost.indexOf( p._id === commentId);
                  // const isCommentExist = draft.data.findIndex(p => p._id === commentId) !== -1;
                  const commentIndex = draft.data.findIndex(p => p._id === commentId);

                  if (commentIndex !== -1) {
                    // Comment exists, and its index is stored in commentIndex
                    console.log("Comment exists at index:", commentIndex);
                    draft.data.splice(commentIndex,1)
                  } else {
                    // Comment does not exist
                    console.log("Comment does not exist.");
                  }
                  // console.log('is comment', isCommentExist);

                 
                }
              )
            );
          }
        } catch {
          console.log("error from postApi on createComment: ");
        }
      },
    }),

    editComment: builder.mutation({
      query: ({ commentId, content }) => ({
        url: `/comments/comment/${commentId}`,
        method: "PATCH",
        body: { content }
      }),
    }),
    getComments: builder.query({
      query: ({ postId }) => ({
        url: `/comments/comment/${postId}`,
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useLikeMutation,
  useGetPostsByUserIdQuery,
  useCreateCommentMutation,
  useGetCommentsQuery,
  useSharePostMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = postApi;
