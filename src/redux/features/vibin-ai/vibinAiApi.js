import { apiSlice } from "../api/apiSlice";

export const vibinAiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    captionGenarator: builder.mutation({
      query: (data) => ({
        url: "/vibinai/genarate-caption",
        method: "POST",
        body: data,
      }),
    }),
    imageGenarator: builder.mutation({
      query: (data) => ({
        url: "/vibinai/genarate-image",
        method: "POST",
        body: data,
      }),
    }),

    postGenaratedData: builder.mutation({
      query: (data) => ({
        url: "/vibinai/post-generated-data",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useCaptionGenaratorMutation, useImageGenaratorMutation, usePostGenaratedDataMutation } =
  vibinAiApi;
