import GroupCard from "../components/GroupCard";
import { useQuery } from "react-query";
import axios from "axios";
import Expense from "../components/Expense";

const DashboardPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");

  const fetchGroups = async () => {
    const { data } = await axios.get(`${API_URL}/api/groups/user/`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return data;
  };

  const fetchExpenses = async () => {
    const { data } = await axios.get(`${API_URL}/api/expenses/user/`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return data;
  };

  const {
    data: groups,
    isLoading: isLoadingGroups,
    error: groupsError,
  } = useQuery("groups", fetchGroups);
  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    error: expensesError,
  } = useQuery("expenses", fetchExpenses);

  if (isLoadingGroups || isLoadingExpenses) return <div>Loading...</div>;
  if (groupsError || expensesError) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col items-center justify-between h-[90%] p-3">
      <div className="flex flex-col items-center">
      <h2 className="self-start">OVERVIEW</h2>
        {expenses.slice(0,2).map((expense) => (
          <Expense
            key={expense._id}
            amount={expense.amount}
            expenseName={expense.expenseName}
            payer={expense.payer}
            splits={expense.splits}
            expenseId = {expense._id}
          />
        ))}

        {expenses.length > 2 && (
          <button className="btn btn-sm rounded-2xl border-1 border-slate-500">
            Show full list
          </button>
        )}
      </div>

      <div className="flex flex-col items-center">
        <h2 className="self-start">MY GROUPS</h2>
        {groups &&
          groups.map((group) => (
            <GroupCard
              groupName={group.groupName}
              key={group._id}
              id={group._id}
            />
          ))}
        <button className="btn w-96 border-1 border-slate-500 border-dashed bg-transparent mt-3">
          +
        </button>
      </div>
      <div className="flex justify-center">
        <button className="btn btn-md rounded-3xl border-1 border-slate-500">
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
