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

  const customButton = document.getElementById("custom-button");

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
      setAmount(expense?.data?.amount);
      setExpenseId(expense.data._id);
    }
  }, [expense]);

  useEffect(() => {
    if (group && customSplit.length === 0) {
      const newSplits = group?.data?.members.map((member) => ({
        userId: member._id,
        amount: amount / group?.data?.members?.length,
      }));

      setSplits(newSplits);
      setGroupId(group.data._id);
      setPayer(user._id);
    }

    if (expense && customSplit.length === 0) {
      const newSplits = expense?.data?.splits.map((split) => ({
        userId: split.userId,
        amount: amount / expense?.data?.splits?.length,
      }));

      setExpenseName(expense?.data?.expenseName);
      setSplits(newSplits);
      setGroupId(expense?.data?.group._id);
      setPayer(expense?.data?.payer._id);
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
    console.log(customSplit);

    const newSplits = customSplit.map((id) => ({
      userId: id,
      amount: amount / customSplit.length,
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
    <form className="h-full flex flex-col justify-between mt-5">
      <div className="flex flex-col">
        <label className="text-slate-600">Expense name</label>
        <input
          type="text"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
          className="border rounded p-2 mt-2"
          required
        />

        <label className="mt-5 text-slate-600">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border rounded p-2 mt-2"
          required
        />

        {/* <p className="mt-3">Group: {group && group?.data?.groupName}</p> */}

        <label className="mt-5 text-slate-600">Paid by:</label>

        <div className="join flex justify-between mt-2">
          <input
            type="radio"
            name="select-payer"
            aria-label="You"
            className="btn basis-1/2 join-item "
            value={user._id}
            onChange={(e) => {
              setPayer(e.target.value);
              console.log(payer);
            }}
            checked={payer === user._id}
          />

          <div className="collapse basis-1/2 join-item">
            <input
              className="btn"
              type="radio"
              onChange={() => setPayer("")} // Clear payer when selecting 'Someone else'
              checked={payer !== user._id}
            />
            <div className="collapse-title m-0 p-0 w-full">
              <input
                className="btn w-full rounded-l-none"
                type="radio"
                onChange={() => setPayer("")} // Clear payer when selecting 'Someone else'
                checked={payer !== user._id}
                aria-label="Someone else"
              />
            </div>

            <div className="collapse-content">
              {group &&
                group?.data?.members
                  .filter((member) => member._id !== user._id)
                  .map((member) => {
                    return (
                      <div className="form-control mt-1" key={member._id}>
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
        </div>

        <label className="mt-5 text-slate-600">Split between</label>
        <div className="join flex justify-between mt-2">
          <input
            type="radio"
            name="select-split"
            aria-label="Everyone"
            className="btn basis-1/2 join-item"
            onChange={(e) => {
              customButton.checked = false;
              setCustomSplit([]);
            }}
            defaultChecked={
              !expense ||
              group?.data?.members?.length === expense?.data?.splits?.length
            }
          />

          <div className="collapse basis-1/2 join-item">
            <input
              className="btn"
              name="select-split"
              type="radio"
              onClick={(e) => {
                customButton.checked = true;
              }}
            />
            <div className="collapse-title m-0 p-0 w-full">
              <input
                className="btn w-full rounded-l-none"
                name=""
                type="radio"
                aria-label="Custom"
                id="custom-button"
                defaultChecked={
                  expense &&
                  group?.data?.members?.length !== expense?.data?.splits?.length
                }
              />
            </div>

            <div className="collapse-content">
              {group &&
                group?.data?.members.map((member) => {
                  return (
                    <div className="form-control mt-2" key={member._id}>
                      <label className="label cursor-pointer">
                        <span>
                          {member.name === user.name ? (
                            <span>{member.name} (You)</span>
                          ) : (
                            <span>{member.name}</span>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          name="select-split-custom"
                          className="checkbox"
                          value={member._id}
                          onChange={handleCustomSplit}
                          defaultChecked={expense?.data?.splits.some(
                            (split) => split.userId === member._id
                          )}
                          checked={customSplit.includes(member._id)}
                        />
                      </label>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      {errorMessage && <p>{errorMessage}</p>}

      
      <div>
        <div className="flex justify-between mt-5">
          {expense && (
            <button
              className="btn btn-error btn-md rounded-lg border-1 basis-[15%]"
              onClick={() => {
                if (expenseId) {
                  deleteExpenseByExpenseId(expenseId);
                }
                navigate(`/group/${groupId}`);
              }}
            >
              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 5.29167H17.8332M7.4165 9.45833V15.7083M11.5832 9.45833V15.7083M2.20817 5.29167L3.24984 17.7917C3.24984 18.3442 3.46933 18.8741 3.86003 19.2648C4.25073 19.6555 4.78064 19.875 5.33317 19.875H13.6665C14.219 19.875 14.7489 19.6555 15.1396 19.2648C15.5303 18.8741 15.7498 18.3442 15.7498 17.7917L16.7915 5.29167M6.37484 5.29167V2.16667C6.37484 1.8904 6.48458 1.62545 6.67993 1.4301C6.87528 1.23475 7.14024 1.125 7.4165 1.125H11.5832C11.8594 1.125 12.1244 1.23475 12.3197 1.4301C12.5151 1.62545 12.6248 1.8904 12.6248 2.16667V5.29167"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <button
            className="btn btn-md rounded-lg border-1 basis-[40%]"
            onClick={() => {
              navigate(-1);
            }}
          >
            CANCEL
          </button>

          <button
            className={`btn btn-primary btn-md rounded-lg border-1 ${expense ? "basis-[40%]" : "basis-[55%]"}`}
            onClick={saveExpenseClick}
          >
            SAVE
          </button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
