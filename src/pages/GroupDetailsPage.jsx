import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Expense from "../components/Expense";

const GroupDetailsPage = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");
  const { groupId } = useParams();

  const fetchGroup = async () => {
    const { data } = await axios.get(`${API_URL}/api/groups/${groupId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return data;
  };

  const fetchExpenses = async () => {
    const { data } = await axios.get(
      `${API_URL}/api/expenses/group/${groupId}`,
      {
        headers: { Authorization: `Bearer ${storedToken}` },
      }
    );
    return data;
  };

  const {
    data: group,
    isLoading: isLoadingGroup,
    error: groupError,
  } = useQuery("group", fetchGroup);
  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    error: expensesError,
  } = useQuery("expenses", fetchExpenses);

  if (isLoadingGroup || isLoadingExpenses) return <div>Loading...</div>;
  if (groupError || expensesError) return <div>An error has occurred.</div>;

  return (
    <div className="flex flex-col justify-between h-[90%]">
      <div className="flex flex-col items-center">
        <div className="w-96">
          <h2 className="self-start">{group.groupName}</h2>
        </div>

        <div className="flex flex-col items-center">
          {expenses.map((expense) => (
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
        <Link to={`/expense/create`} state={group} className="btn btn-md rounded-3xl border-1 border-slate-500" >
          Add Expense
        </Link>
      </div>
    </div>
  );
};

export default GroupDetailsPage;
