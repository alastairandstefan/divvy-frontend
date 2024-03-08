import { useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui/dist/full.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import NavBar from "./components/NavBar";
import CreateGroup from "./pages/CreateGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<></>} />
          <Route path="/signup" element={<></>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/group/create" element={<CreateGroup />} />
          <Route path="/group/:groupId" element={<></>} />
          <Route path="/group/:groupId/edit" element={<></>} />
          <Route path="/expense/create" element={<></>} />
          <Route path="/expense/:expenseId/edit" element={<></>} />
        </Routes>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
