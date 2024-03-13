import { Link } from "react-router-dom";

const GroupCard = ({ groupName, id }) => {
  return (
    <Link
      to={`/group/${id}`}
      className="card h-10 w-12 rounded-xl bg-slate-300 shadow-xl flex justify-center items-center basis-[100%] md:basis-[48%]"
    >
      <h1>{groupName}</h1>
    </Link>
  );
};

export default GroupCard;
