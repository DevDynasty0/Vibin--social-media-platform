import { apiSlice } from "../api/apiSlice";
export const notificationApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getNotifications : builder.query({
            query:()=>({
                url:'/notifications/get-all-notification',
                method:'GET'
            }),
        }),
        getNotificationsByUserId: builder.query({
            query:(id)=>({
                url: `/notifications/get-all-notification/${id}`,
                method:'GET'
            }),
        }),
        createNotification: builder.mutation({
            query: (newNotification) => ({
              url: "/notifications/create-notification",
              method: "POST",
              body: newNotification,
              // headers: {
              //   "Content-Type": "multipart/form-data",
              // },
            }),
            // invalidatesTags: (data) => [{ type: "Posts", id: data._id }],
          }),
    })
})
export const {
useGetNotificationsByUserIdQuery,
useCreateNotificationMutation

} = notificationApi