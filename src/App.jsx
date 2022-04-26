import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";
import Form from "./components/form.component";
import DashboardLogin from "./pages/administration";
import Confirmation from "./pages/confirmation";
import Dashboard from "./pages/dashboard";
import Homapage from "./pages/homepage";

const ConfirmationWrapper = ({ children, employee }) => {
  return employee ? children : <Navigate to="/" replace />;
};

function App() {
  const employee = useSelector(
    (state) => state.employeeToRegister.newEmployee.firstName
  );
  return (
    <>
      <Routes>
        <Route path="/" element={<Homapage />} />
        <Route path="/administration" element={<DashboardLogin />} />
        <Route path="/administration/dashboard" element={<Dashboard />} />
        <Route
          path="/confirmation"
          element={
            <ConfirmationWrapper employee={employee}>
              <Confirmation />
            </ConfirmationWrapper>
          }
        />
      </Routes>
    </>
  );
}

export default App;
