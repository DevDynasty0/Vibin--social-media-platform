import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (userId) => ({
        url: `/chats/conversations/${userId}`,
        method: "GET",
      }),
    }),

    getMessages: builder.query({
      query: (userId, otherId) => ({
        url: `/chats/messages/${userId}/${otherId}`,
        method: "GET",
      }),
    }),

    createMessage: builder.mutation({
      query: (data) => ({
        url: "/chats/create-message",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useCreateMessageMutation,
} = chatApi;
