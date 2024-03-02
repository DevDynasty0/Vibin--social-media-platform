import { apiSlice } from "../api/apiSlice";

export const profileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUserInfo: builder.mutation({
      query: ({userData}) => ({
        url: "/users/update-user-details",
        method: "PATCH",
        body:userData
      }),
    }),
   
    
  }),

});

export const { useUpdateUserInfoMutation} =
  profileApi;
