import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import UserResults from "../components/UserResults";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Get user details from logged in user to add to member list
 *
 * @return {Object} The user details from the API response.
 */
const fetchUserDetails = async () => {
  const storedToken = localStorage.getItem("authToken");
  const response = await axios.get(`${API_URL}/auth/verify`, {
    headers: {
      Authorization: `Bearer ${storedToken}`,
    },
  });
  return response.data;
};

/**
 * Asynchronous function to fetch search results for a given user.
 *
 * @param {string} searchUser - the user email to search for
 * @return {Promise} the data of the search results
 */
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

// Component
const CreateGroup = ({ createGroup }) => {
  const [groupName, setGroupName] = useState("");
  const [searchUser, setSearchUser] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [memberList, setMemberList] = useState([]);
  const [member, setMember] = useState([]);
  const navigate = useNavigate();

  const searchMutation = useMutation(fetchSearchResults, {
    onSuccess: (data) => {
      setSearchInitiated(true);
      // console.log(data);
      // no user found
      if (data.length === 0) {
        toast.warning("No users found", {
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
    },
    onError: (error) => {
      // Handle any errors here
      console.error("Search error:", error);
    },
  });

  // Search for user
  const handleSearchClick = (e) => {
    e.preventDefault();

    // Use regex to validate the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(searchUser)) {
      toast.warning("Provide a valid email", {
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
    } else {
      searchMutation.mutate(searchUser);
      setSearchUser("");
    }
  };

  // Add user to group - called from UserResults.jsx
  const handleAddUserToGroup = (newMember) => {
    setSearchInitiated(false);
    const { id, name, email } = newMember;
    // console.log("Member", newMember);

    // check if userId is already in member array
    if (!member.includes(id)) {
      // add userId to member array
      setMember((prevMember) => [...prevMember, id]);

      setMemberList((prevMemberList) => [...prevMemberList, { ...newMember }]);
      // console.log("MemberList200", memberList);

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

    // console.log("Member", member);
  };

  const handleDeleteMember = (id) => {
    // console.log("incoming ID", id);
    const updatedData = memberList.filter((item) => item.id !== id);
    // console.log("updatedData", updatedData);
    setMemberList(updatedData);
    setMember((prevMember) => prevMember.filter((member) => member !== id));
    setMemberList((prevMemberList) =>
      prevMemberList.filter((member) => member._id !== id)
    );
    // console.log("MemberList update", memberList);
    toast.error("User removed from group", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const { data: searchResults, isLoading, error } = searchMutation;
  const { data: loggedInUser } = useQuery("loggedInUser", fetchUserDetails);

  // if loggedInUser, add loggedInUser to member array if not already in
  useEffect(() => {});

  if (loggedInUser) {
    // console.log("loggedInUser", loggedInUser);
    if (!member.includes(loggedInUser._id)) {
      setMember((prevMember) => [...prevMember, loggedInUser._id]);
      setMemberList((prevMemberList) => [
        ...prevMemberList,
        { ...loggedInUser },
      ]);
      // console.log("loggedInUser", loggedInUser.name);
      // console.log("On Login Member", loggedInUser);
      // console.log("MemberList Login", memberList);
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
      // console.log(response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  return (
    <div className="lex flex-col justify-between h-auto min-h-[90%]  bg-appbg">
      <div className=" flex flex-col justify-between h-full mx-4 ">
        {createGroup ? (
          <h2 className="font-bold text-lg  mt-4 mb-4">Add new group</h2>
        ) : (
          <h2 className="font-bold text-lg  mt-4 mb-4">Edit Group</h2>
        )}
        <label className="form-control ">
          <div className="label">
            <span className="label-text">Name of the Group</span>
          </div>
          <input
            type="text"
            placeholder=""
            className="input input-bordered w-full sm:w-80 mb-4"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            onFocus={() => setSearchInitiated(false)} // search stopped on focus
          />
        </label>
        <form>
          <label className="form-control">
            <div className="label">
              <span className="label-text">Search member by email:</span>
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder=""
                className="input input-bordered w-full sm:w-80 mr-3"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                onFocus={() => setSearchInitiated(false)} // search stopped on focus
              />
              <button
                type="button"
                className="btn btn btn-md bg-[#E2E4E7] border-none uppercase"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>
          </label>
        </form>

        <div id="bottom-section" className="mt-5 w-full"></div>
        <div className="card  bg-[#E2E4E7] text-dark ">
          <div className="card-body ">
            <h2 className="card-title">Group Members</h2>

            {/* Member List */}
            {memberList.length > 0 ? (
              <div>
                {memberList.map((member, index) => (
                  <div key={index} className="flex">
                    <p>{member.name}</p>
                    {/* delete button */}
                    {index !== 0 && ( // Add this line to skip the first element
                      <button
                        className="btn btn-ghost btn-xs "
                        onClick={() => handleDeleteMember(member.id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p>No members found</p>
            )}

            {/* Search Results */}
            {searchInitiated && (
              <div className="mt-5">
                <UserResults
                  searchResults={searchResults}
                  loading={isLoading}
                  handleAddUserToGroup={handleAddUserToGroup}
                  cancelSearch={() => setSearchInitiated(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Button */}
        {memberList.length === 1 ? (
          <button
            className="btn btn-neutral  bottom-3 mt-5 w-auto"
            disabled="disabled"
          >
            {createGroup ? "Create Group" : "Update Group"}
          </button>
        ) : (
          <button
            className="btn btn-BrandGreen  bottom-3 mt-5 w-auto"
            onClick={handleCreateGroup}
          >
            {createGroup ? "Create Group" : "Update Group"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;
