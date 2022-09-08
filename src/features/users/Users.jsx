import { useEffect, useState } from 'react';
import { Table, TableTabs, activeTableTabs } from '../../components/common/Table.tsx';
import { fetchUsers, selectUsers } from './usersSlice.ts';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';

function Users() {
  const dispatch = useAppDispatch();
  const usersData = useAppSelector(selectUsers);
  const [usersState, setUsersState] = useState([]);
  const [orderBy, setOrderBy] = useState('startDate');
  const [filterBy, setFilterBy] = useState('fullName');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabClick = (filter, value, parentNode) => {
    activeTableTabs(parentNode);
    setFilterBy(filter);
    const regex = new RegExp(`^${value}`, 'i');
    setSearchTerm(regex);
  };

  const handleSearchChange = (filter, value) => {
    setFilterBy(filter);
    setSearchTerm(value);

    const defaultTab = document.querySelector('#defaultTab');
    activeTableTabs(defaultTab);
  };

  useEffect(() => {
    const orderedFilteredUsers = usersData.filter(
      (user) => user[filterBy].toLowerCase().match(searchTerm),
    );
    orderedFilteredUsers.sort((a, b) => {
      if (a[orderBy] > b[orderBy]) return 1;
      if (a[orderBy] < b[orderBy]) return -1;
      return 0;
    });
    setUsersState(orderedFilteredUsers);
  }, [usersData, orderBy, searchTerm]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab" id="defaultTab"><button type="button" onClick={(e) => handleTabClick('fullName', '', e.target.parentNode)}>All Employee</button></li>
          <li><button type="button" onClick={(e) => handleTabClick('state', 'active', e.target.parentNode)}>Active Employee</button></li>
          <li><button type="button" onClick={(e) => handleTabClick('state', 'inactive', e.target.parentNode)}>Inactive Employee</button></li>
        </ul>
        <div className="table-tabs__sort">
          <input type="search" name="userName" id="userName" placeholder="Search..." onChange={(e) => { handleSearchChange('fullName', e.target.value); }} />
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="startDate" onChange={(e) => setOrderBy(e.target.value)}>
              <option value="startDate">Start Date</option>
              <option value="fullName">Name</option>
            </select>
          </div>
        </div>
      </TableTabs>
      <Table>
        <thead>
          <tr>
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
            usersState.map((user) => (
              <tr key={user.id}>
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
      </Table>
    </div>
  );
}

export default Users;
