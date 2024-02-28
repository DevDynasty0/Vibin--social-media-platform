import { apiSlice } from "../api/apiSlice";

export const vibinAiApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        captionGenarator: builder.mutation({
            query: (data) => ({
                url: "/vibinai/genarate-caption",
                method: "POST",
                body: data,
            }),
        })
    })
})

export const { useCaptionGenaratorMutation} = vibinAiApi;
  