import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import DashboardLogin from "./pages/administration";
import Confirmation from "./pages/confirmation";
import Dashboard from "./pages/dashboard";
import Homapage from "./pages/homepage";
import { useSelector } from "react-redux";

function App() {
  const themeState = useSelector(state => state.theme.dark)
  console.log(themeState)
  useEffect(() => {
    themeState == 'dark' ? document.querySelector("html")?.classList?.add?.("dark") : document.querySelector("html")?.classList?.remove?.("dark");
    ;

  }, []);

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
