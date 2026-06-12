import { baseApi } from '../../utils/apiBaseQuery';

export const transportationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({



    createTransportation: builder.mutation({
      query: (data) => ({
        url: `/rides/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Transportation"],
    }),
  }),
});

// Export hooks
export const {
  useCreateTransportationMutation
} = transportationApi;
