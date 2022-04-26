import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  newEmployee: {},
  statusCode: 0,
};

const employeeToRegisterSlice = createSlice({
  name: "employeeToRegister",
  initialState,
  reducers: {
    createNewEmployee(state, action) {
      // We don't need to use the ... spread operator to return a new state in here, because RTK is using ImmerJS under the hood.
      state.newEmployee = action.payload;
      // console.log(current(state));
    },
    handleStatusCode(state, action) {
      state.statusCode = action.payload;
      console.log(current(state));
    },
  },
});

export const { createNewEmployee, handleStatusCode } =
  employeeToRegisterSlice.actions;
export default employeeToRegisterSlice.reducer;
