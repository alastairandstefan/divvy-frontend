import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useMutation } from "react-query"; // This approach provides benefits like automatic retries, error handling, and status tracking.
import axios from "axios";
import { deleteExpenseByExpenseId } from "./CRUDFunctions";

const ExpenseForm = (props) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [groupId, setGroupId] = useState("");
  const [payer, setPayer] = useState("");
  const [splits, setSplits] = useState([]);
  const [expenseId, setExpenseId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const expenseMutation = async (expenseData) => {
    if (props.expense) {
      const { data } = await axios.put(
        `${API_URL}/api/expenses/${expenseId}`,
        expenseData,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      return data;
    } else {
      const { data } = await axios.post(
        `${API_URL}/api/expenses`,
        expenseData,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      );
      return data;
    }
  };

  const mutation = useMutation(expenseMutation, {
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    },
  });

  useEffect(() => {
    if (props.expense) setAmount(props.expense.amount);
  },[props])

  useEffect(() => {

    if (props.group) {
      
      const group = props.group;

      const newSplits = group.members.map(member => ({
        userId: member._id,
        amount: amount / group.members.length
      }));

      setSplits(newSplits);

      setGroupId(group._id);
      setPayer(user._id);
    } else if (props.expense) {

      const expense = props.expense;

      const newSplits = expense.splits.map(split => ({
          userId: split.userId,
          amount: amount / expense.splits.length,
        
      }));

      setExpenseName(expense.expenseName);

      setSplits(newSplits);

      setGroupId(expense.group);
      setPayer(expense.payer._id);

      setExpenseId(expense._id);
    }
  }, [props, amount]);



  const saveExpenseClick = (e) => {
    e.preventDefault();

    if (expenseName === "" || amount === "") {
        setErrorMessage("Please ensure all fields have been filled")
        return;
    } 

    const expenseData = {
      expenseName: expenseName,
      amount: Number(amount),
      group: groupId,
      payer: payer,
      splits: splits,
      _id: expenseId,
    };

    mutation.mutate(expenseData);

    setAmount("");

  };

  return (
    <form className="flex flex-col justify-center items-center">
      <label>Expense name</label>
      <input
        type="text"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        className="border rounded p-2 mb--6"
        required
      />

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded p-2 mb--6"
        required
      />

      <label>Group</label>
      <input
        type="text"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        className="border rounded p-2 mb--6"
        required
      />

      <label>Payer</label>
      <input
        type="text"
        value={payer}
        onChange={(e) => setPayer(e.target.value)}
        className="border rounded p-2 mb--6"
        required
      />

      {errorMessage && <p>{errorMessage}</p>}

      <div className="flex justify-center">
        <button
          className="btn btn-md rounded-3xl border-1 border-slate-500"
          onClick={() => {
            deleteExpenseByExpenseId(expenseId);
            navigate(`/group/${groupId}`);
          }}
        >
          Delete
        </button>
      </div>

      <div className="flex justify-center">
        <button
          className="btn btn-md rounded-3xl border-1 border-slate-500"
          onClick={saveExpenseClick}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
