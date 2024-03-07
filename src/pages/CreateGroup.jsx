import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import UserResults from "../components/UserResults";

const API_URL = import.meta.env.VITE_API_URL;

// Get user details from logged in user to add to member list
const fetchUserDetails = async () => {
  const storedToken = localStorage.getItem("authToken");
  const response = await axios.get(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return response.data;
};

const fetchSearchResults = async (searchUser) => {
  try {
    const storedToken = localStorage.getItem("authToken");
    const response = await axios.get(
      `${API_URL}/auth/users/search?email=${searchUser}`,
      {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch search results:", error);
    throw error;
  }
};

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [member, setMember] = useState([]);
  const navigate = useNavigate();

  const searchMutation = useMutation(fetchSearchResults, {
    onSuccess: (data) => {
      setSearchInitiated(true);
      console.log(data);
    },
    onError: (error) => {
      // Handle any errors here
      console.error("Search error:", error);
    },
  });

  const handleSearchClick = (e) => {
    e.preventDefault();
    searchMutation.mutate(searchUser);

    setSearchUser("");
  };

  const handleAddUserToGroup = (userId) => {
    setSearchInitiated(false);

    // check if userId is already in member array
    member.forEach((id) => {
      if (id === userId) {
        console.log("User already in group");
        return;
      } else {
        // add userId to member array
        setMember((prevMember) => [...prevMember, userId]);
        console.log("User added to group");
        return;
      }
    });

    console.log("Member", member);
  };

  const { data: searchResults, isLoading, error } = searchMutation;
  const { data: loggedInUser } = useQuery("loggedInUser", fetchUserDetails);
  // if loggedInUser, add loggedInUser to member array if not already in
  if (loggedInUser) {
    if (!member.includes(loggedInUser._id)) {
      setMember((prevMember) => [...prevMember, loggedInUser._id]);
    }
  }

  const handleCreateGroup = async (e) => {
    e.preventDefault();
    // console.log("Output", { groupName, member })
    try {
      const storedToken = localStorage.getItem("authToken");
      const response = await axios.post(
        `${API_URL}/api/groups`,
        { groupName, members: member },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <div className="flex flex-col px-8 w-96">
      <div className="bg-blue-500 text-red-500 p-4">
        This is a test div with Tailwind CSS.
      </div>
      <h2 className="text-xl">Create New Group</h2>
      <label className="form-control w-full max-w-xs ">
        <div className="label">
          <span className="label-text">Name of the Group</span>
        </div>
        <input
          type="text"
          placeholder="Pizza Night"
          className="input input-bordered w-full max-w-xs"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          onFocus={() => setSearchInitiated(false)}
        />
      </label>

      <form>
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Search and add new member:</span>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-xs"
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </label>
        <button
          type="button"
          className="btn btn-outline"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </form>
      {searchInitiated && (
        <UserResults
          users={searchResults}
          loading={isLoading}
          handleAddUserToGroup={handleAddUserToGroup}
        /> // Only display results if searchInitiated is true
      )}
      <div>
        {member.length > 0 && <h2>Added Members</h2>}
        {member.length > 0 && (
          <div>
            {member.map((user) => (
              <div key={user}>
                <p>{user}</p>
              </div>
            ))}
            <button className="btn btn-primary" onClick={handleCreateGroup}>
              Create Group
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;
