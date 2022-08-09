import usersData from '../../assets/data/users.json';

function Users() {
  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Photo</th>
            <th>Full Name</th>
            <th>ID</th>
            <th>Email</th>
            <th>Start Date</th>
            <th>Description</th>
            <th>Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            usersData.map((user) => (
              <tr key={user.id}>
                <td>
                  <input type="checkbox" id={user.id} />
                </td>
                <td>
                  <img src={user.photo} alt={`${user.fullName} profile pic`} />
                  {user.photo}
                </td>
                <td>
                  {user.fullName}
                </td>
                <td>
                  {user.id}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.startDate}
                </td>
                <td>
                  <span>{user.job}</span>
                  <p>{user.functions}</p>
                </td>
                <td>
                  {user.phone}
                </td>
                <td>
                  {user.state}
                </td>
                <td>
                  <button type="button">Archive</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Users;
