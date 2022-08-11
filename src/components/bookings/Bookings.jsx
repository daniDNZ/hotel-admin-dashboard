import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bookingsData from '../../assets/data/bookings.json';
import roomsData from '../../assets/data/rooms.json';
import { Button } from '../../style/styledComponents';
import Modal from '../common/Modal';
import { Table, TableTabs } from '../common/Table';

function Bookings() {
  const navigate = useNavigate();
  const [modalData, setModalData] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [selectedData, setSelectedData] = useState(
    bookingsData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)),
  );

  const showAllBookings = () => {
    setSelectedData(bookingsData);
  };

  const showInProgress = () => {
    setSelectedData(bookingsData.filter((booking) => booking.status === 'inprogress'));
  };

  const showByCustomer = (e) => {
    const { value } = e.target;
    setSelectedData(
      bookingsData.filter(
        (booking) => booking.fullName.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const sortBookings = (e) => {
    const { value } = e.target;

    switch (value) {
      case 'guest':
        bookingsData.sort((a, b) => a.fullName[0].localeCompare(b.fullName[0]));
        break;
      case 'checkIn':
        bookingsData.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
        break;
      case 'checkOut':
        bookingsData.sort((a, b) => new Date(b.checkOut) - new Date(a.checkOut));
        break;
      case 'date':
      default:
        bookingsData.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
        break;
    }
    setSelectedData([...bookingsData]);
  };

  const goToBooking = (e, booking) => {
    if (e.target.type !== 'button') { navigate(`${booking}`); }
  };

  const throwModal = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  useEffect(() => {}, [selectedData]);
  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li><button type="button" onClick={showAllBookings}>All Bookings</button></li>
          <li><button type="button">Checking In</button></li>
          <li><button type="button">Checking Out</button></li>
          <li><button type="button" onClick={showInProgress}>In Progress</button></li>
        </ul>
        <div className="table-tabs__sort">
          <input type="search" name="customerName" id="customerName" placeholder="Search..." onChange={showByCustomer} />
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="date" onChange={sortBookings}>
              <option value="guest">Guest</option>
              <option value="date">Order Date</option>
              <option value="checkIn">Check In</option>
              <option value="checkOut">Check Out</option>
            </select>
          </div>
        </div>
      </TableTabs>

      <Table>
        <thead>
          <tr>
            <th>Guest</th>
            <th>Order Date</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Special Request</th>
            <th>Room Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {
            selectedData.map((booking) => (
              <tr key={booking.id} onClick={(e) => goToBooking(e, booking.id)}>
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
                  <Button green onClick={() => throwModal(booking.specialRequest)}>
                    View Notes
                  </Button>
                </td>
                <td>
                  {roomsData.find((room) => room.id === booking.room).type}
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
      </Table>
      <Modal data={modalData} openModal={openModal} setOpenModal={setOpenModal} />

      <div>
        <span>Showing 10 of x Data</span>
        <div>Pagination</div>
      </div>
    </div>
  );
}

export default Bookings;
