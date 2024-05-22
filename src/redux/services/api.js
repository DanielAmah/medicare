import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getData } from "../../utils/core"
import { AUTH_TOKEN_KEY } from "../../utils/storage";


const baseUrl = "http://localhost:3001";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: async (headers) => {
    const token = await getData(AUTH_TOKEN_KEY)
    if (token) {
      headers.set("Authorization", `Bearer ${token.auth_token}`)
    }

    return headers
  },
})

export const api = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ['auth'],
  endpoints: () => ({}),
})
