import { api } from "./api"
import { storeData } from '../../utils/core'
import { AUTH_TOKEN_KEY } from '../../utils/storage'
export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET"
      }),
    }),
    createDoctor: builder.mutation({
      query: ({ body }) => ({
        url: `/users/create_doctor`,
        method: "POST",
        body,
      }),
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
      transformResponse: async (raw) => {
        if (raw) {
          storeData(AUTH_TOKEN_KEY, {
            auth_token: raw?.token,
            exp: raw?.exp,
            isAdmin: raw?.is_admin,
            name: raw?.name,
            title: raw?.title,
            profile: raw?.profile,
            userId: raw?.id
          })
        }
        return raw
      },
    }),
    updateDoctor: builder.mutation({
      query: ({ id, body }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body
      }),
    }),
    getDoctor: builder.query({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "GET"
      }),
    }),
    deleteDoctor: builder.mutation({
      query: ({ id }) => ({
        url: `/users/${id}`,
        method: "DELETE"
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetDoctorsQuery, useGetDoctorQuery, useDeleteDoctorMutation, useUpdateDoctorMutation, useCreateDoctorMutation, useLoginMutation } = userApi