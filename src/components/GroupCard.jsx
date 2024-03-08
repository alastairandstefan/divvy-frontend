import { Link } from "react-router-dom";

const GroupCard = ({ groupName, id }) => {
  return (
    <Link
      to={`/group/${id}`}
      className="card w-96 h-28 bg-slate-300 shadow-xl m-3 flex justify-center items-center"
    >
      <h1>{groupName}</h1>
    </Link>
  );
};

export default GroupCard;
