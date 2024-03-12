import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Expense = ({ expenseName, amount, expenseId, payer, splits, group }) => {
  // IMPORT LOGGED IN USER INFO
  const { user } = useContext(AuthContext);

  // CHECK IF USER PAID
  if (payer._id === user._id) {
    // GET SPLITS NOT INCLUDING USER
    const splitsWithoutUser = splits.filter(
      (split) => split.userId._id !== user._id
    );

    // CALCULATE AMOUNT OWING TO USER
    let owedAmount = 0;
    splitsWithoutUser.map((split) => (owedAmount += split.amount));

    return (
      <Link
        to={`/expense/${expenseId}/edit`}
        state={group}
        className="w-screen px-6 mb-6 py-0 flex-col justify-center items-center"
      >
        {/* capitalize first letter */}
        <p className="self-start">{expenseName.charAt(0).toUpperCase() + expenseName.slice(1)}</p>
        <div className="w-full flex justify-between text-green-500 text-sm">
          <p>{`You paid ${amount}`}</p>
          <p>You're owed {owedAmount}</p>
        </div>
      </Link>
    );
  } else {
    // IF USER DID NOT PAY

    // FIND SPLIT CONTAINING CURRENT USER
    const userSplit = splits.find((split) => split.userId._id === user._id);

    return (
      <Link
        to={`/expense/${expenseId}/edit`}
        state={group}
        className="w-screen px-6 mb-6 py-0 flex-col justify-center items-center"
      >
        {/* capitalize first letter */}
        <p className="self-start capitalize">{expenseName.charAt(0).toUpperCase() + expenseName.slice(1)}</p>
        <div className="w-full flex justify-between text-red-500 text-sm">
          <p>{`${payer.name} paid ${amount}`}</p>
          <p>You owe {userSplit.amount}</p>
        </div>
      </Link>
    );
  }
};

export default Expense;
