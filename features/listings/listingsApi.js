import { baseApi } from '../../utils/apiBaseQuery';

export const listingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllListings: builder.query({
      query: (params = {}) => {
        const sp = new URLSearchParams();
        if (params.category) sp.set('category', params.category);
        if (params.isFeatured) sp.set('isFeatured', params.isFeatured);
        if (params.isVerified) sp.set('isVerified', params.isVerified);
        if (params.searchTerm) sp.set('searchTerm', params.searchTerm);
        if (params.page) sp.set('page', String(params.page));
        if (params.limit) sp.set('limit', String(params.limit));
        if (params.structureType) sp.set('structureType', params.structureType);
        if (params.minPrice != null && params.minPrice > 0) sp.set('minPrice', String(params.minPrice));
        if (params.maxPrice != null && params.maxPrice > 0) sp.set('maxPrice', String(params.maxPrice));
        if (params.bedrooms != null && params.bedrooms > 0) sp.set('bedrooms', String(params.bedrooms));
        if (params.bathrooms != null && params.bathrooms > 0) sp.set('bathrooms', String(params.bathrooms));
        if (params.minArea != null && params.minArea > 0) sp.set('minArea', String(params.minArea));
        if (params.maxArea != null && params.maxArea > 0) sp.set('maxArea', String(params.maxArea));
        if (params.city) sp.set('address.city', params.city);
        if (params.state) sp.set('address.state', params.state);
        if (params.area) sp.set('address.area', params.area);
        if (params.latitude != null) sp.set('latitude', String(params.latitude));
        if (params.longitude != null) sp.set('longitude', String(params.longitude));
        const qs = sp.toString();
        return { url: `/properties${qs ? `?${qs}` : ''}`, method: 'GET' };
      },
      providesTags: ['Listing'],
    }),

    getSingleListing: builder.query({
      query: ({ id, userId } = {}) => {
        const qs = userId ? `?userId=${encodeURIComponent(userId)}` : '';
        return { url: `/properties/${id}${qs}`, method: 'GET' };
      },
      providesTags: ['Listing'],
    }),


    getTopCitis: builder.query({
      query: () => `/properties/top-cities`,
      providesTags: ['Listing'],
    }),

  }),
});

export const {
  useGetAllListingsQuery,
  useGetSingleListingQuery,
  useGetTopCitisQuery,
} = listingsApi;
