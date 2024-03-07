import { useState, } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NavBar from "./components/NavBar";
import GroupCreate from "./pages/GroupCreate";

function App() {
  return (
    <div > 
      <NavBar />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/signup" element={<></>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/group/create" element={<GroupCreate />} />
        <Route path="/group/:groupId" element={<></>} />
        <Route path="/group/:groupId/edit" element={<></>} />
        <Route path="/expense/create" element={<></>} />
        <Route path="/expense/:expenseId/edit" element={<></>} />
      </Routes>
    </div>
  );
}

export default App;
