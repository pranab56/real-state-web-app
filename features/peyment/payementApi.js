import { baseApi } from '../../utils/apiBaseQuery';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllTransection: builder.query({
      query: ({ page }) => ({
        url: `/transactions/my-transactions?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],

    }),

    getHostTransaction: builder.query({
      query: ({ page }) => ({
        url: `/transactions/host-transactions?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Transaction"],
    }),
  }),
});
// Export hooks
export const {
  useGetAllTransectionQuery,
  useGetHostTransactionQuery
} = paymentApi;
