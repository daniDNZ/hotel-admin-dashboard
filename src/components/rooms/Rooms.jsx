import { useState, useEffect } from 'react';
import roomsData from '../../assets/data/rooms.json';
import { Table, TableTabs, activeTableTabs } from '../common/Table';

function Rooms() {
  const [roomsState, setRoomsState] = useState([]);
  const [orderBy, setOrderBy] = useState('orderDate');
  const [filterBy, setFilterBy] = useState('type');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabClick = (filter, value, parentNode) => {
    activeTableTabs(parentNode);
    setFilterBy(filter);
    setSearchTerm(value);
  };

  useEffect(() => {
    const orderedFilteredRooms = roomsData.filter(
      (room) => room[filterBy].toLowerCase().includes(searchTerm.toLowerCase()),
    );
    orderedFilteredRooms.sort((a, b) => {
      if (orderBy === 'lowerPrice') {
        if (parseFloat(a.price) > parseFloat(b.price)) return 1;
        if (parseFloat(a.price) < parseFloat(b.price)) return -1;
      } else if (orderBy === 'higherPrice') {
        if (parseFloat(a.price) > parseFloat(b.price)) return -1;
        if (parseFloat(a.price) < parseFloat(b.price)) return 1;
      } else {
        if (a[orderBy] > b[orderBy]) return 1;
        if (a[orderBy] < b[orderBy]) return -1;
      }
      return 0;
    });
    setRoomsState(orderedFilteredRooms);
  }, [roomsData, orderBy, searchTerm]);
  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab"><button type="button" onClick={(e) => handleTabClick('type', '', e.target.parentNode)}>All Rooms</button></li>
          <li><button type="button" onClick={(e) => handleTabClick('type', '', e.target.parentNode)}>Available</button></li>
          <li><button type="button" onClick={(e) => handleTabClick('type', '', e.target.parentNode)}>Occuped</button></li>
        </ul>
        <div className="table-tabs__sort">
          <div>
            <select name="sortRooms" id="sortRooms" defaultValue="number" onChange={(e) => setOrderBy(e.target.value)}>
              <option value="number">Number</option>
              <option value="lowerPrice">$</option>
              <option value="higherPrice">$$$</option>
            </select>
          </div>
        </div>
      </TableTabs>
      <Table>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Room Type</th>
            <th>Room Number</th>
            <th>Amenities</th>
            <th>Price</th>
            <th>Offer Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            roomsState.map((room) => (
              <tr key={room.id}>
                <td>
                  <span>
                    #
                    {room.id}
                  </span>
                  <br />
                  <span>
                    {room.type}
                    {room.number}
                  </span>
                </td>
                <td>
                  {room.type}
                </td>
                <td>
                  {room.number}
                </td>
                <td>
                  {room.amenities}
                </td>
                <td>
                  {room.price}
                  €
                </td>
                <td>
                  {
                    // eslint-disable-next-line max-len
                    (parseFloat(room.price) - (parseFloat(room.price) * (parseFloat(room.discount) / 100))).toFixed(2)
                  }
                  €
                </td>
                <td>
                  Available
                </td>
                <td>
                  <button type="button">...</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Rooms;
