import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const GroupDetailsExpense = ({ expenseName, amount, id, payer, splits }) => {
  const { user } = useContext(AuthContext);

  const userSplit = splits.find((split) => split.userId._id === user._id);

  return (
    <Link
      to={`/group/${id}`}
      className="card w-96 h-28 bg-slate-300 shadow-xl m-3 flex justify-center items-center"
    >
      <h1>{expenseName}</h1>
      <p>{`${payer.name} paid ${amount}`}</p>
      <p>You owe {userSplit.amount}</p>
    </Link>
  );
};

export default GroupDetailsExpense;
