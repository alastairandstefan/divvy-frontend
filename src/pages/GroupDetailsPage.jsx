import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Expense from "../components/Expense";
import { getExpenseByGroupId, getGroupByGroupId } from "../components/RetrieveFunctions";

const GroupDetailsPage = () => {

  const { groupId } = useParams();

  const {groupData, isLoadingGroup, groupError} = getGroupByGroupId(groupId);
  const {expensesData, isLoadingExpenses, expensesError} = getExpenseByGroupId(groupId);

  if (isLoadingGroup || isLoadingExpenses) return <div>Loading...</div>;
  if (groupError || expensesError) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-between h-[90%]">
      <div className="flex flex-col items-center">
        <div className="w-96">
          <h2 className="self-start">{groupData.groupName}</h2>
        </div>

        <div className="flex flex-col items-center">
          {expensesData.map((expense) => (
            <Expense
              key={expense._id}
              amount={expense.amount}
              expenseName={expense.expenseName}
              payer={expense.payer}
              splits={expense.splits}
              expenseId = {expense._id}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Link to={`/expense/create`} state={{group: groupData, newExpense: false}} className="btn btn-md rounded-3xl border-1 border-slate-500" >
          Add Expense
        </Link>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
