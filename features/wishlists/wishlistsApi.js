import { baseApi } from '../../utils/apiBaseQuery';

export const wishlistsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createWishlistToggle: builder.mutation({
      query: (data) => ({
        url: `/wishlists/toggle`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlists", "Listing"],
    }),

    getMyWishlists: builder.query({
      query: () => `/wishlists/my-wishlist`,
      providesTags: ["Wishlists"],
    }),



  }),
});

// Export hooks
export const {
  useCreateWishlistToggleMutation,
  useGetMyWishlistsQuery
} = wishlistsApi;
