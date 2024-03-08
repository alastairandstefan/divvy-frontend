import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import UserResults from "../components/UserResults";
import { toast } from "react-toastify";

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
    if (!member.includes(userId)) {
      setMember((prevMember) => [...prevMember, userId]);
      toast.success("User added to group", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.warning("User already in group", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

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
    if (!groupName || !member) {
      toast.warning("Please fill in all fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
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
    <div className="flex flex-col w-full h-full ">
      <div>
        <h2 className="text-xl mx-4  sm:w-80">Create New Group</h2>
        <div className="divider mx-4 m-0"></div>
        <label className="form-control mx-4">
          <div className="label">
            <span className="label-text">Name of the Group</span>
          </div>
          <input
            type="text"
            placeholder="Pizza Night or Birthday Party"
            className="input input-bordered w-full sm:w-80 mb-4"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            // onFocus={() => setSearchInitiated(false)}
          />
        </label>
        <form>
          <label className="form-control mx-4">
            <div className="label">
              <span className="label-text">Search member by email:</span>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Search"
                className="input input-bordered w-full sm:w-80 mr-3"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>
          </label>
        </form>
        {searchInitiated && (
          <UserResults
            users={searchResults}
            loading={isLoading}
            handleAddUserToGroup={handleAddUserToGroup}
            cancelSearch={() => setSearchInitiated(false)}
          />
        )}
      </div>

      <div>
        <div className="mx-4">
          {member.length > 0 && (
            <div>
              <h2 className="text-xl sm:w-80">Added Members</h2>
              <div className="divider  "></div>
              {member.map((user) => (
                <div key={user}>
                  <p>{user}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Button */}
        {member.length === 1 ? (
          <button
            className="btn btn-neutral mx-4 bottom-3  w-auto"
            disabled="disabled"
          >
            Create Group
          </button>
        ) : (
          <button
            className="btn btn-primary mx-4 bottom-3  w-auto"
            onClick={handleCreateGroup}
          >
            Create Group
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;
