import roomsData from '../../assets/data/rooms.json';
import { Table, TableTabs, activeTableTabs } from '../common/Table';

function Rooms() {
  const filterRooms = (e) => {
    activeTableTabs(e.target.parentNode);
  };
  const sortRooms = (e) => e;
  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab"><button type="button" onClick={filterRooms}>All Rooms</button></li>
          <li><button type="button" onClick={filterRooms}>Available</button></li>
          <li><button type="button" onClick={filterRooms}>Occuped</button></li>
        </ul>
        <div className="table-tabs__sort">
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="number" onChange={sortRooms}>
              <option value="number">Number</option>
              <option value="lowerPrice">$</option>
              <option value="highestPrice">$$$</option>
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
            roomsData.map((room) => (
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
