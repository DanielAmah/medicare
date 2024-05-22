import { api } from "./api"

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

export const { useGetDoctorsQuery, useGetDoctorQuery, useDeleteDoctorMutation, useCreateDoctorMutation } = userApi