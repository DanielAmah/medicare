import { api } from "./api"

export const paymentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPaymentSummary: builder.query({
      query: () => ({
        url: `/transactions/summary`,
        method: "GET"
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetPaymentSummaryQuery } = paymentApi