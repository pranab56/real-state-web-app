import { baseApi } from '../../utils/apiBaseQuery';

export const inquiryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createInquiry: builder.mutation({
      query: (data) => ({
        url: `/inquiries/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inquiry"],
    }),

  }),
});

// Export hooks
export const {
  useCreateInquiryMutation,
} = inquiryApi;
