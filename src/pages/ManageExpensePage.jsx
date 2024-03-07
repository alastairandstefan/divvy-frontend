import ExpenseForm from "../components/ExpenseForm";
import { useLocation } from "react-router-dom";

const ManageExpensePage = () => {
  const location = useLocation();

  const group = location.state;

  return (
    <div className="flex flex-col justify-center h-[90%] p-3">
      <h2 className="self-start">Create Expense</h2>

      <ExpenseForm group={group} />

      
    </div>
  );
};

export default ManageExpensePage;
