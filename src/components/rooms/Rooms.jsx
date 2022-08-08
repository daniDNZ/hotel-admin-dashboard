import roomsData from '../../data/rooms.json';

function Rooms() {
  return (
    <div>
      <h1>Rooms</h1>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
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
                  <input type="checkbox" id={room.id} />
                </td>
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
      </table>
    </div>
  );
}

export default Rooms;
