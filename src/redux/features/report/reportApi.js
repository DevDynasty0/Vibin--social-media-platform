import { apiSlice } from "../api/apiSlice";

export const reportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      userReport: builder.mutation({
        query: ({userReportInfo}) => ({
          url: "/users/report-user",
          method: "POST",
          body:userReportInfo
        }),
      }), 
    
      postReport: builder.mutation({
        query:(postReportInfo)=>({
            url: "/users/report-post",
            method: "POST",
            body:postReportInfo
        })
      })     
    }),
});


export const {usePostReportMutation, useUserReportMutation} = reportApi