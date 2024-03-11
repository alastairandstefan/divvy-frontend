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
  const { groupsData, isLoadingGroups, groupsError } = getGroupsOfUser();
  const { expensesData, isLoadingExpenses, expensesError } =
    getExpensesOfUser();

  if (isLoadingGroups || isLoadingExpenses) return <div>Loading...</div>;
  if (groupsError || expensesError) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col items-center justify-between h-[90%] p-3">
      <div>
        <h2>OVERVIEW</h2>
        <div className="flex flex-col items-center">
          {expensesData.slice(0, 2).map((expense) => (
            <Expense
              key={expense._id}
              amount={expense.amount}
              expenseName={expense.expenseName}
              payer={expense.payer}
              splits={expense.splits}
              expenseId={expense._id}
            />
          ))}

          {expensesData.length > 2 && (
            <button className="btn btn-sm rounded-2xl border-1 border-slate-500">
              Show full list
            </button>
          )}
        </div>
      </div>

      <div>
        <h2>MY GROUPS</h2>
        <div className="flex justify-center">
          <div className="flex flex-wrap">
            {groupsData &&
              groupsData.map((group) => (
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
