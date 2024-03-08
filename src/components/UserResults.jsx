const UserResults = ({
  searchResults,
  loading,
  handleAddUserToGroup,
  cancelSearch,
}) => {
  console.log("users", searchResults);
  console.log("name", searchResults[0].name);
  const newMember = {
    name: searchResults[0].name,
    email: searchResults[0].email,
    id: searchResults[0]._id,
  };

  return (
    <div className="">
      {searchResults ? (
        <div className="flex ">
          {/* Search Results */}
          <p>{searchResults[0].name}</p>

          {/* Button to cancel or add */}
          <button className="btn btn-ghost btn-xs " onClick={cancelSearch}>
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
          <button
            className="btn btn-primary btn-xs"
            // onClick={() => handleAddUserToGroup(searchResults[0]._id)}
            onClick={() => handleAddUserToGroup(newMember)}
          >
            Add
          </button>
        </div>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserResults;
