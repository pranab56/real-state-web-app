import { baseApi } from '../../utils/apiBaseQuery';

export const manageHotelsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    createProperty: builder.mutation({
      query: (data) => ({
        url: `/properties/accommodation/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),


    updateProperty: builder.mutation({
      query: ({ id, data }) => ({
        url: `/properties/accommodation/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Property"],
    }),

    getAllProperty: builder.query({
      query: ({ userId, page = 1 } = {}) => ({
        url: `/properties?provider=${userId}&page=${page}`,
        method: "GET",
      }),
      providesTags: ["Property"],
    }),


    deleteProperty: builder.mutation({
      query: ({ propertyId }) => ({
        url: `/properties/my-property/${propertyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Property"],
    }),
  }),
});

export const {
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useGetAllPropertyQuery,
  useDeletePropertyMutation,
} = manageHotelsApi;
