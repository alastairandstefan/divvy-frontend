import ExpenseForm from "../components/ExpenseForm";
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import axios from "axios";

const ManageExpensePage = () => {
  const location = useLocation();
  const { expenseId } = useParams();
  const group = location.state;

  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  const {
    data: expense,
    isLoading,
    error,
  } = useQuery("expense", async () => {
    if (expenseId) {
      const { data } = await axios.get(`${API_URL}/api/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      return data;
    }
    return null;
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-center h-[90%] p-3">
      <h2 className="self-start">Create Expense</h2>

      <ExpenseForm group={group} expense={expense} />
    </div>
  );
};

export default ManageExpensePage;
