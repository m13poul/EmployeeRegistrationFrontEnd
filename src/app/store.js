import { configureStore } from "@reduxjs/toolkit";
import { EmployeesAPI } from "../features/dataFetchAPI";

import employeeToRegisterReducer from "../features/registrationSlice";

export const store = configureStore({
  reducer: {
    employeeToRegister: employeeToRegisterReducer,
    [EmployeesAPI.reducerPath]: EmployeesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(EmployeesAPI.middleware),
});
