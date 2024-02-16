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
    })
})
export const {
useGetNotificationsByUserIdQuery,

} = notificationApi