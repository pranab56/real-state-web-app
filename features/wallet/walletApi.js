import { baseApi } from '../../utils/apiBaseQuery';

export const walletApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getMyWallet: builder.query({
      query: () => ({
        url: `/wallets/my-wallet`,
        method: "GET",
      }),
      providesTags: ["Wallet"],
    }),


    getChapaBankList: builder.query({
      query: () => ({
        url: `/wallets/chapa-bank-list`,
        method: "GET",
      }),
    }),


    connectWallet: builder.mutation({
      query: (data) => ({
        url: `/wallets/payout-method/connect`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet"],
    }),

    withdrawMoney: builder.mutation({
      query: (data) => ({
        url: `/wallets/payout-withdrawal`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wallet"],
    }),
  }),
});

// Export hooks
export const {
  useGetMyWalletQuery,
  useGetChapaBankListQuery,
  useConnectWalletMutation,
  useWithdrawMoneyMutation,
} = walletApi;
