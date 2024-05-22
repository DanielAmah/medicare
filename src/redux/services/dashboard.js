import { api } from "./api"

export const dashboardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStatistics: builder.query({
      query: () => ({
        url: `/dashboards/statistics`,
        method: "GET"
      }),
    }),
    getDashboardEarnings: builder.query({
      query: () => ({
        url: `/dashboards/earnings`,
        method: "GET"
      }),
    }),
    getRecentTransactions: builder.query({
      query: () => ({
        url: `/transactions/recent`,
        method: "GET"
      }),
    }),
    getTotalAppointments: builder.query({
      query: () => ({
        url: `/appointments/total`,
        method: "GET"
      }),
    }),
    getTodayAppointments: builder.query({
      query: () => ({
        url: `/appointments/today`,
        method: "GET"
      }),
    }),
  }),
  overrideExisting: true,
})

export const { useGetDashboardStatisticsQuery, useGetDashboardEarningsQuery, useGetRecentTransactionsQuery, useGetTodayAppointmentsQuery, useGetTotalAppointmentsQuery } = dashboardApi