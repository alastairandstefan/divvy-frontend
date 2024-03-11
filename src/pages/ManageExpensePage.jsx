import ExpenseForm from "../components/ExpenseForm";
import { useLocation, useParams } from "react-router-dom";

import { getExpenseByExpenseId } from "../components/CRUDFunctions";

const ManageExpensePage = () => {
  const location = useLocation();
  const { expenseId } = useParams();
  const group = location.state;

  let expense;

  if (expenseId) {

    expense = getExpenseByExpenseId(expenseId);

  }

  if (expense?.isLoading) return <div>Loading...</div>;
  if (expense?.error) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-center h-[90%] p-3">

      {!expense ? <h2 className="self-start">Create Expense</h2> : <h2 className="self-start">Edit Expense</h2>}

      <ExpenseForm group={group} expense={expense?.data} />

    </div>
  );
};

export default ManageExpensePage;

