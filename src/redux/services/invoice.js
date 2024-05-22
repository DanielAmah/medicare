import { api } from "./api"

export const invoiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => ({
        url: `/invoices`,
        method: "GET"
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetInvoicesQuery } = invoiceApi