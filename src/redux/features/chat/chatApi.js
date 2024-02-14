import { apiSlice } from "../api/apiSlice";

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (id) => ({
        url: `/chats/conversations/${id}`,
        method: "GET",
      }),
    }),

    getMessages: builder.query({
      query: (userId, chatId) => ({
        url: `/chats/messages/${userId}/${chatId}`,
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
