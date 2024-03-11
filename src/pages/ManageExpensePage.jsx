import ExpenseForm from "../components/ExpenseForm";
import { useLocation, useParams } from "react-router-dom";

import { getExpenseByExpenseId } from "../components/RetrieveFunctions";

const ManageExpensePage = () => {
  const location = useLocation();
  const { expenseId } = useParams();
  const group = location.state;
  const newExpense = location.state;

  const {expenseData, isLoadingExpense, expenseError} = getExpenseByExpenseId(expenseId);

  if (isLoadingExpense) return <div>Loading...</div>;
  if (expenseError) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-center h-[90%] p-3">

      {newExpense ? <h2 className="self-start">Create Expense</h2> : <h2 className="self-start">Edit Expense</h2>}

      <ExpenseForm group={group} expense={expenseData} />
    </div>
  );
};

export default ManageExpensePage;

