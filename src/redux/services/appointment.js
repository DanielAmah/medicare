import { api } from "./api"

export const appointmentApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppointments: builder.query({
      query: () => ({
        url: `/appointments/index`,
        method: "GET"
      }),
    }),
    createAppointment: builder.mutation({
      query: (body) => ({
        url: `/appointments`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetAppointmentsQuery, useCreateAppointmentMutation } = appointmentApi 