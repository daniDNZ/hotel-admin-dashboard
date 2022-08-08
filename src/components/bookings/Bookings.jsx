import { Link } from 'react-router-dom';
import bookingsData from '../../data/bookings.json';

function Bookings() {
  return (
    <div>
      <h1>Bookings</h1>
      <Link to="234">Link</Link>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>Guest</th>
            <th>Order Date</th>
            <th>Check In</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Special Request</th>
            <th>Room Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            bookingsData.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <input type="checkbox" id={booking.id} />
                </td>
                <td>
                  <span>{booking.fullName}</span>
                  <br />
                  <span>
                    #
                    {booking.id}
                  </span>
                </td>
                <td>
                  {booking.orderDate}
                </td>
                <td>
                  {booking.checkIn}
                </td>
                <td>
                  {booking.checkOut}
                </td>
                <td>
                  <button type="button">View Notes</button>
                </td>
                <td>
                  {`${booking.roomType} ${booking.roomNumber}`}
                </td>
                <td>
                  {booking.status}
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

export default Bookings;
