const UserResults = ({ users, loading, handleAddUserToGroup, cancelSearch }) => {
  // console.log(users);
  // const handleAddUserToGroup = (userId) => {
  //   console.log(userId);
  // };

  return (
    <div className="w-full mx-4">
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title mb-4">Add {user.name} to your group.</h2>
                  {/* <p>
                    We found {user.name} with this email address: {user.email}
                  </p> */}
                  <div className="card-actions justify-end">
                    <button className="btn btn-ghost" onClick={cancelSearch}>Cancel</button>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddUserToGroup(user._id)}
                    >
                      Add to group
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No users found</p>
      )}
    </div>
  );
};

export default UserResults;
