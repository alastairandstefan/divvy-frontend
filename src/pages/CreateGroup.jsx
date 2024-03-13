import { useMutation, useQuery } from "react-query";
import { Link, useNavigate, useLocation } from "react-router-dom";
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

const fetchGroupDetails = async (groupID) => {
  try {
    const storedToken = localStorage.getItem("authToken");
    const response = await axios.get(`${API_URL}/api/groups/${groupID}`, {
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch group details:", error);
    throw error;
  }
};

// Component
const CreateGroup = ({ createGroup }) => {
  const location = useLocation();

  const groupData = location.state?.groupData || {}; // get groupID from location state GroupDetailsPage
  console.log("groupData:", groupData);

  const [groupName, setGroupName] = useState(groupData?.groupName || "");
  const [searchUser, setSearchUser] = useState("");
  const [searchInitiated, setSearchInitiated] = useState(false);
  const [members, setMembers] = useState(groupData?.members || []);
  const navigate = useNavigate();

  // Initialize members with existing members when the component mounts or when the group data is loaded
  useEffect(() => {
    if (groupData && groupData.members) {
      setMembers(
        groupData.members.map((member) => ({
          id: member._id,
          name: member.name,
          email: member.email,
        }))
      );
    }
  }, [groupData]);
  

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

  // Function to add a member
  const handleAddUserToGroup = (newMember) => {
    setSearchInitiated(false);
    const { id, name, email } = newMember;

    // Check if userId is already in members array
    if (!members.some((member) => member.id === id)) {
      // Add user object to members array
      setMembers((prevMembers) => [...prevMembers, { id, name, email }]);

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
  };

  // Function to remove a member
  const handleDeleteMember = (id) => {
    const updatedMembers = members.filter((member) => member.id !== id);
    setMembers(updatedMembers);

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

  // Correct the useEffect hook to add the loggedInUser to the members array

  if (loggedInUser && createGroup) {
    // Check if loggedInUser is already in members array
    if (!members.some((member) => member.id === loggedInUser._id)) {
      // Add loggedInUser to members array
      setMembers((prevMembers) => [
        ...prevMembers,
        {
          id: loggedInUser._id,
          name: loggedInUser.name,
          email: loggedInUser.email,
        },
      ]);
    }
  }

  // Create Group or edit group
  const handleCreateGroup = async (e) => {
    e.preventDefault();
    const memberIds = members.map((member) => member.id);
    console.log("Output", { groupName, members: memberIds });
    if (!groupName || !members) {
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
        { groupName, members: memberIds },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      //navigate to newly created group
      navigate(`/group/${response.data._id}`);
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  // Update Group
  const handleUpdateGroup = async (e) => {
    e.preventDefault();
    const memberIds = members.map((member) => member.id);
    console.log("Output", { id: groupData._id, groupName, members: memberIds });
    if (!groupName || memberIds.length === 0) {
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
      const response = await axios.put(
        `${API_URL}/api/groups/` + groupData._id,
        { groupName, members: memberIds },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      console.log(response.data);
      navigate(-1);
      return response.data;
    } catch (error) {
      console.error("Failed to update group:", error);
      toast.error("Failed to update group", {
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
  };

  // delete group
  const handleDeleteGroup = async (e) => {
    // check if loggedInUser is the owner of the group
    console.log(groupData.members[0]._id);
    if (loggedInUser._id !== groupData.members[0]._id) {
      toast.error("You are not the owner of this group", {
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
      const response = await axios.delete(
        `${API_URL}/api/groups/` + groupData._id,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      navigate("/dashboard");
      return response.data;
    } catch (error) {
      console.error("Failed to delete group:", error);
    }
  };

  return (
    <div className="lex flex-col justify-between h-auto min-h-[92.5%]  bg-appbg">
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
            onChange={(e) => {
              setGroupName(e.target.value);
            }}
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
                className="btn  btn-md bg-[#E2E4E7] border-none uppercase"
                onClick={handleSearchClick}
              >
                Search
              </button>
            </div>
          </label>
        </form>

        <div id="bottom-section" className="mt-5 w-full"></div>
        <div className="card  bg-[#E2E4E7] text-dark mb-10">
          <div className="card-body ">
            <h2 className="card-title text-lg">Group Members</h2>

            {/* Member List */}
            {members.length > 0 ? (
              <div>
                {members.map((member, index) => (
                  <div key={index} className="flex">
                    <p>
                      {member.name}
                      {index == 0 ? " (Creator)" : ""}
                      {member.name === loggedInUser?.name ? " (You)" : ""}
                    </p>
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
        {!createGroup ? (
          <div className="flex h-auto justify-between">
            <button
              onClick={() => handleDeleteGroup(groupData._id)}
              className="btn bg-warning text-white w-auto border-none"
            >
              {" "}
              <svg
                width="19"
                height="21"
                viewBox="0 0 19 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.1665 5.29167H17.8332M7.4165 9.45833V15.7083M11.5832 9.45833V15.7083M2.20817 5.29167L3.24984 17.7917C3.24984 18.3442 3.46933 18.8741 3.86003 19.2648C4.25073 19.6555 4.78064 19.875 5.33317 19.875H13.6665C14.219 19.875 14.7489 19.6555 15.1396 19.2648C15.5303 18.8741 15.7498 18.3442 15.7498 17.7917L16.7915 5.29167M6.37484 5.29167V2.16667C6.37484 1.8904 6.48458 1.62545 6.67993 1.4301C6.87528 1.23475 7.14024 1.125 7.4165 1.125H11.5832C11.8594 1.125 12.1244 1.23475 12.3197 1.4301C12.5151 1.62545 12.6248 1.8904 12.6248 2.16667V5.29167"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              className="btn border-none bg-secondary basis-[40%]"
              onClick={() => {
                navigate(-1);
              }}
            >
              CANCEL
            </button>
            {members.length === 1 ? (
              <button className="btn  w-auto" disabled="disabled">
                Update Group
              </button>
            ) : (
              // Update Group
              <button
                className="btn btn-primary basis-[40%] uppercase"
                onClick={handleUpdateGroup}
              >
                Save update
              </button>
            )}
          </div>
        ) : (
          <div>
            {members.length === 1 ? (
              <button className="btn btn-primary w-full" disabled="disabled">
                Create Group
              </button>
            ) : (
              <button
                className="btn btn-primary w-full"
                onClick={handleCreateGroup}
              >
                Create Group
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateGroup;
