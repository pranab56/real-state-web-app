import { baseApi } from '../../../utils/apiBaseQuery';

export const confrimBookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyHotelBookingReservation: builder.query({
      query: ({ page, userId }) => ({
        url: `/reservations?page=${page}&provider=${userId}`,
        method: "GET",
      }),
      providesTags: ["hotelPartner"],
    }),

    updateStatus: builder.mutation({
      query: ({ reservationId, data }) => ({
        url: `/reservations/${reservationId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["hotelPartner", "Reservation"],
    }),

  }),
});

// Export hooks
export const {
  useGetMyHotelBookingReservationQuery,
  useUpdateStatusMutation,
} = confrimBookingApi;
