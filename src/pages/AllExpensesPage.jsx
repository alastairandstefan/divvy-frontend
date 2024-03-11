import { getExpensesOfUser } from "../components/CRUDFunctions";
import { Link } from "react-router-dom";
import Expense from "../components/Expense";

const AllExpensesPage = () => {

    const expenses = getExpensesOfUser();
  
    if (expenses.isLoading) return <p>Loading...</p>;
    if (expenses.error) return <div>An error has occurred.</div>;
  
    return (
      <div className="flex flex-col justify-between h-[90%] w-[99%] p-3">
        <div>
          <h2>ALL EXPENSES</h2>
          <div className="flex flex-col items-center m-3">
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
            to={`/dashboard`}
            className="btn btn-md rounded-3xl border-1 border-slate-500"
          >
            Back
          </Link>
        </div>
      </div>
    );
  };
  
  export default AllExpensesPage;