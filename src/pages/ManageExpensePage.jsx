import ExpenseForm from "../components/ExpenseForm";
import { useLocation, useParams } from "react-router-dom";

import { getExpenseByExpenseId, getGroupByGroupId } from "../components/CRUDFunctions";
import { useEffect } from "react";
import { useQuery } from "react-query";

const ManageExpensePage = () => {
  const location = useLocation();
  const { expenseId } = useParams();
  const groupId = location?.state?.groupId;
 
  



    const expense = useQuery("expense", () => getExpenseByExpenseId(expenseId), {
      enabled: !!expenseId,
    });

   const group = useQuery("group", () => getGroupByGroupId(expense?.data?.group || groupId), {
      enabled: !!expense?.data?.group || !!groupId,
    });

  




  if (group?.isLoading ||expense?.isLoading) return <div>Loading...</div>;
  if (group?.error || expense?.error) return <div>An error has occurred.</div>;
  

  return (
    <div className="flex flex-col h-[92.5%] p-3">

      {!expense ? <h2 className="self-start font-medium">Create Expense</h2> : <h2 className="self-start font-medium">Edit Expense</h2>}

    <ExpenseForm group={group} expense={expense} />
      

    </div>
  );
};

export default ManageExpensePage;

