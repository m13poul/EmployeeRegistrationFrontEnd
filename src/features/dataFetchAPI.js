import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EmployeesAPI = createApi({
  reducerPath: "employeesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_HOST}/${
      import.meta.env.VITE_API_KEY
    }`,
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllEmployeesFromDatabase: builder.query({
      query: () =>
        `${import.meta.env.VITE_BACKEND_HOST}/${import.meta.env.VITE_API_KEY}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllEmployeesFromDatabaseQuery } = EmployeesAPI;
