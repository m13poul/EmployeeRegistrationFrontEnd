import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const EmployeesAPI = createApi({
  reducerPath: "employeesAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/TcYU5yzUteW0y6ek4vSohb4EC8p2",
  }),
  keepUnusedDataFor: 30,
  endpoints: (builder) => ({
    getAllEmployeesFromDatabase: builder.query({
      query: () => `http://localhost:3001/TcYU5yzUteW0y6ek4vSohb4EC8p2`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllEmployeesFromDatabaseQuery } = EmployeesAPI;
