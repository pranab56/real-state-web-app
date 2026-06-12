import { baseApi } from '../../utils/apiBaseQuery';

export const poaApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createPoa: builder.mutation({
      query: (data) => ({
        url: `/consultations/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Poa"],
    }),

  }),
});

// Export hooks
export const {
  useCreatePoaMutation
} = poaApi;
