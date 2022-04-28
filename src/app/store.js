import { configureStore } from "@reduxjs/toolkit";
import { EmployeesAPI } from "../features/dataFetchAPI";

import employeeToRegisterReducer from "../features/registrationSlice";
import themeSliceReducer from "../features/themeSlice";

export const store = configureStore({
  reducer: {
    employeeToRegister: employeeToRegisterReducer,
    theme: themeSliceReducer,
    [EmployeesAPI.reducerPath]: EmployeesAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(EmployeesAPI.middleware),
});
