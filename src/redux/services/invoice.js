import { api } from "./api"

export const invoiceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: () => ({
        url: `/invoices`,
        method: "GET"
      }),
    }),
    createInvoices: builder.mutation({
      query: (body) => ({
        url: `/invoices`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetInvoicesQuery, useCreateInvoicesMutation } = invoiceApi