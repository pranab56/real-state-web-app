import { baseApi } from '../../utils/apiBaseQuery';

export const newsletterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createNewsletter: builder.mutation({
      query: (data) => ({
        url: `/newsletters/subscribe`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Newsletter"],
    }),

  }),
});

// Export hooks
export const {
  useCreateNewsletterMutation
} = newsletterApi;
