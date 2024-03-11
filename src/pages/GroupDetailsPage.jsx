import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Expense from "../components/Expense";
import {
  getExpenseByGroupId,
  getGroupByGroupId,
} from "../components/CRUDFunctions";

const GroupDetailsPage = () => {

  const { groupId } = useParams();

  const group = getGroupByGroupId(groupId);
  const expenses = getExpenseByGroupId(groupId);

  if (group.isLoading || expenses.isLoading) return <p>Loading...</p>;
  if (group.error || expenses.error) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-between h-[90%] w-screen p-3">
      <div>
        <h2>{group.data && group.data.groupName.toUpperCase()}</h2>
        <div className="flex flex-col items-center">
          {expenses.data && expenses.data.map((expense) => (
            <Expense
              key={expense._id}
              amount={expense.amount}
              expenseName={expense.expenseName}
              payer={expense.payer}
              splits={expense.splits}
              expenseId={expense._id}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Link
          to={`/expense/create`}
          state={group.data}
          className="btn btn-md rounded-3xl border-1 border-slate-500"
        >
          Add Expense
        </Link>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
