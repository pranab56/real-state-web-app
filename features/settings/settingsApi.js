import { baseApi } from '../../utils/apiBaseQuery';

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getSettings: builder.query({
      query: () => ({
        url: `/settings`,
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),
  }),
});

export const {
  useGetSettingsQuery
} = settingsApi;
