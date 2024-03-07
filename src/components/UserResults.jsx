const UserResults = ({ users, loading, handleAddUserToGroup }) => {
  // console.log(users);
  // const handleAddUserToGroup = (userId) => {
  //   console.log(userId);
  // };

  return (
    <div>
      {users ? (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              <div className="card w-96 bg-neutral text-neutral-content">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">Add {user.name} to the group</h2>
                  <p>
                    We found {user.name} with this email address: {user.email}
                  </p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-ghost">Cancel</button>
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
