import GroupCard from "../components/GroupCard";
import { useQuery } from "react-query";
import axios from "axios";
import Expense from "../components/Expense";
import { Link } from "react-router-dom";
import {
  getExpensesOfUser,
  getGroupsOfUser,
} from "../components/CRUDFunctions";

const DashboardPage = () => {
  const groups = getGroupsOfUser();
  const expenses = getExpensesOfUser();

  if (groups.isLoading || expenses.isLoading) return <div>Loading...</div>;
  if (groups.error || expenses.error) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-between h-[90%] w-[99%] p-3">
      <div className="w-full">
        <h2>OVERVIEW</h2>
        <div className="flex flex-col items-center m-3">
          {expenses.data && expenses.data.slice(0, 2).map((expense) => (
            
            <Expense
              key={expense._id}
              amount={expense.amount}
              expenseName={expense.expenseName}
              payer={expense.payer}
              splits={expense.splits}
              expenseId={expense._id}
              group={expense.group}
            />
          ))}

          {expenses.data.length > 3 && (
            <Link to="/expenses" className="btn btn-sm rounded-xl border-1 border-slate-500 m-3">
              Show full list
            </Link>
          )}
        </div>
      </div>

      <div className="w-full">
        <h2>MY GROUPS</h2>
        
          <div className="flex flex-wrap mt-3 gap-4">
            {groups.data &&
              groups.data.map((group) => (
                <GroupCard
                  groupName={group.groupName}
                  key={group._id}
                  id={group._id}
                />
              ))}
            <button className="btn h-24 border-1 border-slate-500 border-dashed bg-transparent basis-[30%] rounded-xl">
              +
            </button>
          </div>
        
      </div>
    </div>
  );
};

export default DashboardPage;
