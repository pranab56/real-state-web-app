import { baseApi } from '../../utils/apiBaseQuery';

export const disclaimersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getDisclaimers: builder.query({
      query: (disclaimerType) => ({
        url: `/disclaimers/${disclaimerType}`, // privacy_policy / terms_of_service
        method: "GET",
      }),
    }),

  }),
});

// Export hooks
export const {
  useGetDisclaimersQuery,
} = disclaimersApi;
