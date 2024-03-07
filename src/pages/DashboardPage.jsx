import GroupCard from "../components/GroupCard";
import { useQuery } from "react-query";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const fetchGroups = async () => {
  const storedToken = localStorage.getItem("authToken");
  const { data } = await axios.get(`${API_URL}/api/groups/user/`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  });
  return data;
};

const DashboardPage = () => {
  const { data: groups, isLoading, error } = useQuery("groups", fetchGroups);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error has occurred: {error.message}</div>;

  return (
    <div className="flex flex-col items-center">
      <div className="w-96">
        <h2 className="self-start">OVERVIEW</h2>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="self-start">MY GROUPS</h2>
        {groups &&
          groups.map((group) => (
            <GroupCard
              groupName={group.groupName}
              key={group._id}
              id={group._id}
            />
          ))}
        <button className="btn w-96 border-1 border-slate-500 border-dashed bg-transparent mt-5 ">
          +
        </button>
      </div>
        <button className="btn w-96 border-1 border-slate-500 mt-5 ">
          Add Expense
        </button>
    </div>
  );
};

export default DashboardPage;
