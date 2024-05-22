import { api } from "./api"

export const serviceApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getServices: builder.query({
      query: () => ({
        url: `/services`,
        method: "GET"
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetServicesQuery } = serviceApi