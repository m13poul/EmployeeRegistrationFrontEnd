import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import DashboardLogin from "./pages/administration";
import Confirmation from "./pages/confirmation";
import Dashboard from "./pages/dashboard";
import Homapage from "./pages/homepage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Homapage />} />
        <Route path="/administration" element={<DashboardLogin />} />
        <Route path="/administration/dashboard" element={<Dashboard />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </>
  );
}

export default App;
