import GroupCard from "../components/GroupCard";
import { useQuery } from "react-query";
import axios from "axios";
import Expense from "../components/Expense";
import { Link } from "react-router-dom";
import {
  getExpensesOfUser,
  getGroupsOfUser,
} from "../components/RetrieveFunctions";

const DashboardPage = () => {
  const groups = getGroupsOfUser();
  const expenses = getExpensesOfUser();

  if (groups.isLoading || expenses.isLoading) return <div>Loading...</div>;
  if (groups.error || expenses.error) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-between h-[90%] w-screen p-3">
      <div>
        <h2>OVERVIEW</h2>
        <div className="flex flex-col items-center">
          {expenses.data && expenses.data.slice(0, 2).map((expense) => (
            <Expense
              key={expense._id}
              amount={expense.amount}
              expenseName={expense.expenseName}
              payer={expense.payer}
              splits={expense.splits}
              expenseId={expense._id}
            />
          ))}

          {expenses.data.length > 2 && (
            <button className="btn btn-sm rounded-2xl border-1 border-slate-500">
              Show full list
            </button>
          )}
        </div>
      </div>

      <div>
        <h2>MY GROUPS</h2>
        <div className="flex justify-center">
          <div className="flex flex-wrap w-screen">
            {groups.data &&
              groups.data.map((group) => (
                <GroupCard
                  groupName={group.groupName}
                  key={group._id}
                  id={group._id}
                />
              ))}
            <button className="btn w-24 h-24 border-1 border-slate-500 border-dashed bg-transparent m-3">
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
