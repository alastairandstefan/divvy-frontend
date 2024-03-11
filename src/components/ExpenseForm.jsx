import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useMutation } from "react-query";
import axios from "axios";
import { deleteExpenseByExpenseId } from "./CRUDFunctions";

const ExpenseForm = ({ group, expense }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Ensure proper initialization of state values
  const [expenseName, setExpenseName] = useState(
    expense?.data.expenseName || ""
  );
  const [amount, setAmount] = useState(expense?.data?.amount || "");
  const [groupId, setGroupId] = useState(group?.data?._id || "");
  const [payer, setPayer] = useState(expense?.data?.payer._id || "");
  const [splits, setSplits] = useState([]);
  const [customSplit, setCustomSplit] = useState([]);
  const [expenseId, setExpenseId] = useState(expense?.data?._id || "");
  const [errorMessage, setErrorMessage] = useState("");

  const expenseMutation = async (expenseData) => {
    try {
      const url = expenseId
        ? `${API_URL}/api/expenses/${expenseId}`
        : `${API_URL}/api/expenses`;
      const method = expenseId ? "put" : "post";
      const { data } = await axios[method](url, expenseData, {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
  };

  const mutation = useMutation(expenseMutation, {
    onSuccess: () => {
      navigate(-1);
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  useEffect(() => {
    if (expense) {
      setAmount(expense.data.amount);
      setExpenseId(expense.data._id);
    }
  }, [expense]);

  useEffect(() => {
    if (group) {
      const newSplits = group.data.members.map((member) => ({
        userId: member._id,
        amount: amount / group.data.members.length,
      }));

      setSplits(newSplits);
      setGroupId(group.data._id);
      setPayer(user._id);
    }

    if (expense) {
      const newSplits = expense.data.splits.map((split) => ({
        userId: split.userId,
        amount: amount / expense.data.splits.length,
      }));

      setExpenseName(expense.data.expenseName);
      setSplits(newSplits);
      setGroupId(expense.data.group._id);
      setPayer(expense.data.payer._id);
    }
  }, [group, expense, amount, user._id]);

  const handleCustomSplit = (e) => {
    const memberId = e.target.value;
    const isChecked = e.target.checked;
  
    setCustomSplit((prevCustomSplit) => {
      if (isChecked) {
        return [...prevCustomSplit, memberId];
      } else {
        return prevCustomSplit.filter((id) => id !== memberId);
      }
    });
  };
  

  useEffect(() => {
    console.log(customSplit)

    const newSplits = customSplit.map(id => ({
      userId: id,
      amount: amount / customSplit.length
    }));

    setSplits(newSplits);

  }, [customSplit]);

  const saveExpenseClick = (e) => {
    e.preventDefault();

    if (expenseName === "" || amount === "") {
      setErrorMessage("Please ensure all fields have been filled");
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
    <form className="h-[90%] flex flex-col justify-between mt-3">
      <div className="flex flex-col">
        <label>Expense name</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="border rounded p-2 mb--6"
          required
        />

        <label className="mt-5">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded p-2 mb--6"
          required
        />

        <p className="mt-3">Group: {group && group.data.groupName}</p>

        <label className="mt-3">Who paid?</label>
        <div role="tablist" className="tabs tabs-boxed mt-1">
          <input
            type="radio"
            name="select-payer"
            role="tab"
            className="tab"
            aria-label="Me"
            value={user._id}
            onChange={(e) => {
              setPayer(e.target.value);
              console.log(payer);
            }}
            checked={payer === user._id}
          />

          <input
            type="radio"
            role="tab"
            className="tab"
            aria-label="Someone else"
            onChange={() => setPayer("")} // Clear payer when selecting 'Someone else'
            checked={payer !== user._id}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-1"
          >
            {group &&
              group.data.members
                .filter((member) => member._id !== user._id)
                .map((member) => {
                  return (
                    <div className="form-control" key={member._id}>
                      <label className="label cursor-pointer">
                        <span>{member.name}</span>
                        <input
                          type="radio"
                          name="select-payer"
                          className="radio"
                          value={member._id}
                          onChange={(e) => {
                            setPayer(e.target.value);
                            console.log(payer);
                          }}
                          checked={payer === member._id}
                        />
                      </label>
                    </div>
                  );
                })}
          </div>
        </div>
        <label className="mt-3">Split between</label>
        <div role="tablist" className="tabs tabs-boxed mt-1">
          <input
            type="radio"
            name="select-split"
            role="tab"
            className="tab"
            aria-label="Everyone"
            onChange={() => setCustomSplit([])}
            defaultChecked={
              !expense ||
              group.data.members.length === expense?.data?.splits.length
            }
          />

          <input
            type="radio"
            name="select-split"
            role="tab"
            className="tab"
            aria-label="Custom"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6 mt-1"
          >
            {group &&
              group.data.members.map((member) => {
                return (
                  <div className="form-control" key={member._id}>
                    <label className="label cursor-pointer">
                      <span>
                        {member.name === user.name ? (
                          <span>{member.name} (Me)</span>
                        ) : (
                          <span>{member.name}</span>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        name="select-split-custom"
                        className="checkbox"
                        value={member._id}
                        checked={customSplit.includes(member._id)}
                        onChange={handleCustomSplit}
                      />
                    </label>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {errorMessage && <p>{errorMessage}</p>}
      <div>
        <div className="flex justify-evenly mt-5">
          {expense && (
            <button
              className="btn btn-md rounded-3xl border-1 border-slate-500"
              onClick={() => {
                if (expenseId) {
                  deleteExpenseByExpenseId(expenseId);
                }
                navigate(`/group/${groupId}`);
              }}
            >
              Delete
            </button>
          )}

          {!expense && (
            <button
              className="btn btn-md rounded-3xl border-1 border-slate-500"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </button>
          )}

          <button
            className="btn btn-md rounded-3xl border-1 border-slate-500"
            onClick={saveExpenseClick}
          >
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
