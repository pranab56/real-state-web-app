import { baseApi } from '../../utils/apiBaseQuery';

export const reservationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createReservation: builder.mutation({
      query: (data) => ({
        url: `/reservations/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reservation"],
    }),

    getMyReservation: builder.query({
      query: ({ page, userId }) => ({
        url: `/reservations?page=${page}&customer=${userId}`,
        method: "GET",
      }),
      providesTags: ["Reservation"],
    }),

  }),
});

// Export hooks
export const {
  useCreateReservationMutation,
  useGetMyReservationQuery,
} = reservationApi;
