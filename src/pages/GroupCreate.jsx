import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const fetchSearchResults = async (query) => {
  const storedToken = localStorage.getItem("authToken");
  const { data } = await axios.get(`${API_URL}/auth/user/search?q=${query}`, {
    headers: { Authorization: `Bearer ${storedToken}` },
  });
  return data;
};

const GroupCreate = () => {

  const [searchUser, setSearchUser] = useState("");
//   const { data: user, isLoading, error } = useQuery("user", fetchSearchResults);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>An error has occurred: {error.message}</div>;
    
  return (
    <div className="flex flex-col p-10 w-96">
      <h2 className="text-xl">Create New Group</h2>
      <label className="form-control w-full max-w-xs ">
        <div className="label">
          <span className="label-text">Name of the Group</span>
        </div>
        <input
          type="text"
          placeholder="Pizza Night"
          className="input input-bordered w-full max-w-xs"
        />
      </label>

      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Search and add new member</span>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-full max-w-xs"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
        />
      </label>
    </div>
  );
};

export default GroupCreate;
