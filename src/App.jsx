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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignUpPage from "./pages/SignUpPage";
import { AnonymousRoute, PrivateRoute } from "./components/RouteChecks";
import AllExpensesPage from "./pages/AllExpensesPage";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <AnonymousRoute>
              <LandingPage />
            </AnonymousRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <AnonymousRoute>
              <SignUpPage />
            </AnonymousRoute>
          }
        />
        <Route
          path="/login"
          element={
            <AnonymousRoute>
              <LoginPage />
            </AnonymousRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/logout" element={<></>} /> */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <PrivateRoute>
              <AllExpensesPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/create"
          element={
            <PrivateRoute>
              <CreateGroup createGroup={true} />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:groupId"
          element={
            <PrivateRoute>
              <GroupDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/group/:groupId/edit"
          element={<CreateGroup createGroup={false} />}
        />
        <Route
          path="/expense/create"
          element={
            <PrivateRoute>
              <ManageExpensePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/expense/:expenseId/edit"
          element={
            <PrivateRoute>
              <ManageExpensePage />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={
            <AnonymousRoute>
              <LandingPage />
            </AnonymousRoute>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
