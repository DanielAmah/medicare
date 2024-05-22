import { api } from "./api"

export const patientApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRecentPatients: builder.query({
      query: () => ({
        url: `/patients/recent`,
        method: "GET"
      }),
    }),
    createPatient: builder.mutation({
      query: ({ body }) => ({
        url: `/patients`,
        method: "POST",
        body,
      }),
    }),
    getPatientsCards: builder.query({
      query: () => ({
        url: `/patients/patient_dashboard_cards`,
        method: "GET"
      }),
    }),
    getPatients: builder.query({
      query: () => ({
        url: `/patients/index`,
        method: "GET"
      }),
    }),
    getPatient: builder.query({
      query: ({id}) => ({
        url: `/patients/${id}`,
        method: "GET"
      }),
    }),
    deletePatient: builder.mutation({
      query: ({id}) => ({
        url: `/patients/${id}`,
        method: "DELETE"
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetRecentPatientsQuery, useDeletePatientMutation, useCreatePatientMutation, useGetPatientsCardsQuery, useGetPatientsQuery, useGetPatientQuery } = patientApi