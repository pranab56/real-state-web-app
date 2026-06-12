import { baseApi } from '../../utils/apiBaseQuery';

export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllBlogs: builder.query({
      query: ({ searchTerm, page, status } = {}) => {
        const params = new URLSearchParams();
        if (searchTerm) params.set('searchTerm', searchTerm);
        if (page) params.set('page', String(page));
        if (status) params.set('status', status);
        const qs = params.toString();
        return { url: `/blogs${qs ? `?${qs}` : ''}`, method: 'GET' };
      },
    }),

    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
    }),

  }),
});

// Export hooks
export const {
  useGetAllBlogsQuery,
  useGetSingleBlogQuery,
} = blogApi;
