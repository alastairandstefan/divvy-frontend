const UserResults = ({
  searchResults,
  loading,
  handleAddUserToGroup,
  cancelSearch,
}) => {
  let newMember = null;

  // Check if searchResults is not empty and the first result is defined
  if (searchResults && searchResults.length > 0 && searchResults[0]) {
    newMember = {
      name: searchResults[0].name,
      email: searchResults[0].email,
      id: searchResults[0]._id,
    };
  }

  if(newMember) {


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
  );  }
  else {
    // Handle the case where searchResults is empty or the first result is undefined
    return <p>No users found</p>;
 }
};

export default UserResults;
