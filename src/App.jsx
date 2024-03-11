import { useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NavBar from "./components/NavBar";
import GroupDetailsPage from "./pages/GroupDetailsPage";
import ManageExpensePage from "./pages/ManageExpensePage";
import CreateGroup from "./pages/CreateGroup";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<></>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/group/create" element={<CreateGroup />} />
        <Route path="/group/:groupId" element={<GroupDetailsPage /> } />
        <Route path="/group/:groupId/edit" element={<></>} />
        <Route path="/expense/create" element={<ManageExpensePage/>} />
        <Route path="/expense/:expenseId/edit" element={<ManageExpensePage/>} />
      </Routes>
    </>
  );
}

export default App;
