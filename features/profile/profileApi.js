import { baseApi } from '../../utils/apiBaseQuery';

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getProfile: builder.query({
      query: () => ({
        url: `/users/profile`,
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: `/users/profile`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),


    changePassword: builder.mutation({
      query: (data) => ({
        url: `/auth/change-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      }),
      invalidatesTags: ["Profile"],
    }),


  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation
} = profileApi;
