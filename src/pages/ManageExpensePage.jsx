import ExpenseForm from "../components/ExpenseForm";
import { useLocation, useParams } from "react-router-dom";

import { getExpenseByExpenseId, getGroupByGroupId } from "../components/CRUDFunctions";
import { useEffect } from "react";

const ManageExpensePage = () => {
  const location = useLocation();
  const { expenseId } = useParams();
  const group = location.state;
  const groupId = location.state;


console.log(group)
console.log(groupId);
 
  let expense;
  let groupData;


  if (expenseId) {

    expense = getExpenseByExpenseId(expenseId);

  }

  if (group || groupId) {
    groupData = getGroupByGroupId(group || groupId);
  }

  if (group?.isLoading ||expense?.isLoading) return <div>Loading...</div>;
  if (group?.error || expense?.error) return <div>An error has occurred.</div>;
  

  return (
    <div className="flex flex-col h-[90%] p-3">

      {!expense ? <h2 className="self-start font-medium">Create Expense</h2> : <h2 className="self-start font-medium">Edit Expense</h2>}

    <ExpenseForm group={groupData} expense={expense} />
      

    </div>
  );
};

export default ManageExpensePage;

