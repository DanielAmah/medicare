import { configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api"
export const createStore = (
 options
) =>
 configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,

  },
  middleware: (getDefaultMiddleware) =>
   getDefaultMiddleware().concat(api.middleware),
  ...options,
 })

export const store = createStore()



