import { baseApi } from '../../utils/apiBaseQuery';

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createReview: builder.mutation({
      query: (data) => ({
        url: `/reviews/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),



    getReviewsByProperty: builder.query({
      query: ({ propertyId, page }) => ({
        url: `/reviews/property/${propertyId}?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    getMyReviews: builder.query({
      query: () => ({
        url: `/reviews/my-reviews`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsByPropertyQuery,
  useGetMyReviewsQuery
} = reviewApi;
