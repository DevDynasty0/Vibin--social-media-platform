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
      }),
    }),
    savePost: builder.mutation({
      query: (newSavePost) => {
        console.log("newsaveposttttt", newSavePost);

        return { url: `/posts/savePost`, method: "POST", body: newSavePost };
      },
    }),
    getSavePost: builder.query({
      query: () => ({
        url: `/posts/getSavePost`,
        method: "GET",
      }),
    }),
    deletePost: builder.mutation({
      query: ({ postId }) => ({
        url: `/posts/delete-post/${postId}`,
        method: "DELETE",
      }),
      async onQueryStarted({ postId }, { dispatch, queryFulfilled }) {
        try {
          const { data: deletePost } = await queryFulfilled;
          console.log("deletepost", deletePost);
          if (deletePost?.result?.deletedCount) {
            dispatch(
              postApi.util.updateQueryData("getPosts", undefined, (draft) => {
                return draft.filter((p) => p._id != postId);
              })
            );
          }
        } catch {
          console.log("error from postApi on createComment: ");
        }
      },
    }),
    sharePost: builder.mutation({
      query: ({ post }) => ({
        url: `/posts/create-post-share/${post._id}`,
        method: "PATCH",
      }),
      async onQueryStarted({ post }, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;

          dispatch(
            postApi.util.updateQueryData("getPosts", undefined, (draft) => {
              const draftPost = draft.find((p) => p._id === post._id);
              draftPost.shares += 1;
            })
          );
          dispatch(
            postApi.util.updateQueryData(
              "getPostsByUserId",
              { userId: post.user._id },
              (draft) => {
                const draftPost = draft.find((p) => p._id === post._id);
                draftPost.shares += 1;
              }
            )
          );
        } catch {
          console.log("error from postApi on createComment: ");
        }
      },
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
      async onQueryStarted(
        { postId, commentId },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: postComment } = await queryFulfilled;
          if (postComment?.data?.deletedCount) {
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
                  const commentIndex = draft.data.findIndex(
                    (p) => p._id === commentId
                  );
                  if (commentIndex !== -1) {
                    draft.data.splice(commentIndex, 1);
                  }
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
        body: { content },
      }),
      async onQueryStarted(
        { commentId, postId },
        { dispatch, queryFulfilled }
      ) {
        try {
          const { data: editedComment } = await queryFulfilled;
          if (editedComment?.data?._id) {
            dispatch(
              postApi.util.updateQueryData(
                "getComments",
                { postId },
                (draft) => {
                  const findEditedComment = draft.data.find(
                    (c) => c._id === commentId
                  );
                  findEditedComment.comment = editedComment.data.comment;
                  findEditedComment.updatedAt = editedComment.data.updatedAt;
                }
              )
            );
          }
        } catch {
          console.log("error from postApi on createComment: ");
        }
      },
    }),
    getComments: builder.query({
      query: ({ postId }) => ({
        url: `/comments/comment/${postId}`,
      }),
    }),
    addReaction: builder.mutation({
      query: ({ post, type }) => ({
        url: `/posts/reaction/${post._id}`,
        method: "PATCH",
        body: { type },
      }),
      async onQueryStarted(
        { post, type },
        { getState, dispatch, queryFulfilled }
      ) {
        const loggedInUser = getState()?.auth?.user;
        const userId = post.user._id;

        // optimistic cache update for liking start
        const likeForHomePost = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const draftPost = draft.find((p) => p._id === post._id);
            const existingReact = draftPost?.reactions.find(
              (reaction) => reaction.user._id === loggedInUser._id
            );

            const isReactionExist = draftPost?.reactions.find(
              (reaction) => reaction.user._id === loggedInUser._id
            );

            if (isReactionExist) {
              if (type) {
                existingReact.type = type;
              } else {
                const filteredData = draftPost.reactions.filter(
                  (reaction) => reaction.user._id !== loggedInUser._id
                );
                draftPost.reactions = filteredData;
              }
            } else {
              draftPost.reactions.push({ user: loggedInUser, type });
            }
          })
        );
        const likeForProfilePost = dispatch(
          postApi.util.updateQueryData(
            "getPostsByUserId",
            {
              userId,
            },
            (draft) => {
              const draftPost = draft.find((p) => p._id === post?._id);
              const existingReact = draftPost?.reactions.find(
                (reaction) => reaction.user._id === loggedInUser._id
              );

              const isReactionExist = draftPost?.reactions.find(
                (reaction) => reaction.user._id === loggedInUser._id
              );

              if (isReactionExist) {
                if (type) {
                  existingReact.type = type;
                } else {
                  const filteredData = draftPost.reactions.filter(
                    (reaction) => reaction.user._id !== loggedInUser._id
                  );
                  draftPost.reactions = filteredData;
                }
              } else {
                draftPost.reactions.push({ user: loggedInUser, type });
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
    addReactionOnSharePost: builder.mutation({
      query: ({ post, type }) => ({
        url: `/posts/reaction-on-share-post/${post._id}`,
        method: "PATCH",
        body: { type },
      }),
      async onQueryStarted(
        { post, type },
        { getState, dispatch, queryFulfilled }
      ) {
        const loggedInUser = getState()?.auth?.user;
        const userId = post.user._id;

        // optimistic cache update for liking start
        const likeForHomePost = dispatch(
          postApi.util.updateQueryData("getPosts", undefined, (draft) => {
            const draftPost = draft.find((p) => p._id === post._id);
            const existingReact = draftPost?.reactions.find(
              (reaction) => reaction.user._id === loggedInUser._id
            );

            const isReactionExist = draftPost?.reactions.find(
              (reaction) => reaction.user._id === loggedInUser._id
            );

            if (isReactionExist) {
              if (type) {
                existingReact.type = type;
              } else {
                const filteredData = draftPost.reactions.filter(
                  (reaction) => reaction.user._id !== loggedInUser._id
                );
                draftPost.reactions = filteredData;
              }
            } else {
              draftPost.reactions.push({ user: loggedInUser, type });
            }
          })
        );
        const likeForProfilePost = dispatch(
          postApi.util.updateQueryData(
            "getPostsByUserId",
            {
              userId,
            },
            (draft) => {
              const draftPost = draft.find((p) => p._id === post?._id);
              const existingReact = draftPost?.reactions.find(
                (reaction) => reaction.user._id === loggedInUser._id
              );

              const isReactionExist = draftPost?.reactions.find(
                (reaction) => reaction.user._id === loggedInUser._id
              );

              if (isReactionExist) {
                if (type) {
                  existingReact.type = type;
                } else {
                  const filteredData = draftPost.reactions.filter(
                    (reaction) => reaction.user._id !== loggedInUser._id
                  );
                  draftPost.reactions = filteredData;
                }
              } else {
                draftPost.reactions.push({ user: loggedInUser, type });
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
  }),
});

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useCreatePostMutation,
  useSavePostMutation,
  useGetSavePostQuery,
  useDeletePostMutation,
  useSharePostMutation,
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetCommentsQuery,
  useAddReactionMutation,
  useAddReactionOnSharePostMutation,
} = postApi;
