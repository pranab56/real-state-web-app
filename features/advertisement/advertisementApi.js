import { baseApi } from '../../utils/apiBaseQuery';

export const advertisementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdvertisement: builder.query({
      query: () => ({
        url: `/advertisements/active`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetAdvertisementQuery,
} = advertisementApi;
