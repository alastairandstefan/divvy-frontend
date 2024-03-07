import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useMutation } from "react-query"; // This approach provides benefits like automatic retries, error handling, and status tracking.
import axios from "axios";

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
  const [errorMessage, setErrorMessage] = useState("");

  const expenseMutation = async (expenseData) => {
    const { data } = await axios.post(`${API_URL}/api/expenses`, expenseData, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    return data;
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

  const saveExpenseClick = (e) => {
    e.preventDefault();

   
    if (props) {

        console.log(props)

      const group = props.group;

      group.members.map((member) => {
        setSplits([
          ...splits,
          { userId: member._id, amount: amount / group.members.length },
        ]);
      });

      setGroupId(group._id);
      setPayer(user._id);
    }

    const expenseData = { expenseName: expenseName, amount: amount, group: groupId, payer: payer, splits: splits };

    console.log(expenseData)

    mutation.mutate(expenseData);
  };

  return (
    <form className="flex flex-col justify-center items-center">
      <label>Expense name</label>
      <input
        type="expenseName"
        value={expenseName}
        onChange={(e) => setExpenseName(e.target.value)}
        className="border rounded p-2 mb--6"
      />

      <label>Amount</label>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border rounded p-2 mb--6"
      />
      {errorMessage && <p>{errorMessage}</p>}

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
