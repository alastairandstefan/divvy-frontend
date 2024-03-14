import { Link } from "react-router-dom";

const GroupCard = ({ groupName, id, groupColor }) => {
  
  if(groupColor) {
    return (
      <Link
        to={`/group/${id}`}
        className="card h-14 w-12 rounded-xl bg-slate-300 shadow-xl flex justify-center items-center basis-[100%] md:basis-[48%]"
        style={{backgroundColor: groupColor}}
      >
        <h1 className="capitalize">{groupName}</h1>
      </Link>
    )
  } 

  return (
    <Link
      to={`/group/${id}`}
      className="card h-14 w-12 rounded-xl bg-slate-300 shadow-xl flex justify-center items-center basis-[100%] md:basis-[48%]"
    >
      <h1 className="capitalize">{groupName}</h1>
    </Link>
  );
};

export default GroupCard;
