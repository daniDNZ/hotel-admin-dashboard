import { Link } from 'react-router-dom';
import bookingsData from '../../assets/data/bookings.json';

function Bookings() {
  return (
    <div>
      <h1>Bookings</h1>
      <div>
        <ul>
          <li><button type="button">All Bookings</button></li>
          <li><button type="button">Checking In</button></li>
          <li><button type="button">Checking Out</button></li>
          <li><button type="button">In Progress</button></li>
        </ul>
        <div>
          <input type="search" name="customerName" id="customerName" placeholder="Search..." />
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="date">
              <option value="guest">Guest</option>
              <option value="date">Order Date</option>
              <option value="checkIn">Check In</option>
              <option value="checkOut">Check Out</option>
            </select>
          </div>
        </div>
      </div>
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
                  <button type="button"><Link to={`${booking.id}`}>View Notes</Link></button>
                </td>
                <td>
                  {`${booking.type} ${booking.number}`}
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
      <div>
        <span>Showing 10 of x Data</span>
        <div>Pagination</div>
      </div>
    </div>
  );
}

export default Bookings;
