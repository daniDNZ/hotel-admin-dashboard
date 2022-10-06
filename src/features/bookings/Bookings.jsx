/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../style/styledComponents';
import Modal from '../../components/common/Modal';
import { Table, TableTabs, activeTableTabs } from '../../components/common/Table';
import { fetchBookings, selectBookings } from './bookingsSlice';
import { checkIsNotAButton, dateBuilder } from '../../assets/functions';

function Bookings() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bookingsData = useSelector(selectBookings).bookings;
  const [modalData, setModalData] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [bookingsState, setBookingsState] = useState([]);
  const [orderBy, setOrderBy] = useState('orderDate');
  const [filterBy, setFilterBy] = useState('fullName');
  const [searchTerm, setSearchTerm] = useState('');

  const throwModal = (data) => {
    setOpenModal(true);
    setModalData(data);
  };

  const handleTabClick = (filter, value, parentNode) => {
    activeTableTabs(parentNode);
    setFilterBy(filter);
    setSearchTerm(value);
  };

  const handleSearchChange = (filter, value) => {
    setFilterBy(filter);
    setSearchTerm(value);

    const defaultTab = document.querySelector('#defaultTab');
    activeTableTabs(defaultTab);
  };

  useEffect(() => {
    if (bookingsData) {
      const orderedFilteredBookings = bookingsData.filter(
        (booking) => booking[filterBy].toLowerCase().includes(searchTerm.toLowerCase()),
      );
      orderedFilteredBookings.sort((a, b) => {
        if (a[orderBy] > b[orderBy]) return 1;
        if (a[orderBy] < b[orderBy]) return -1;
        return 0;
      });
      setBookingsState(orderedFilteredBookings);
    }
  }, [bookingsData, orderBy, searchTerm]);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab" id="defaultTab"><button type="button" onClick={(e) => { handleTabClick('fullName', '', e.target.parentNode); }}>All Bookings</button></li>
          <li><button type="button" onClick={(e) => { handleTabClick('status', 'checkin', e.target.parentNode); }}>Checking In</button></li>
          <li><button type="button" onClick={(e) => { handleTabClick('status', 'checkout', e.target.parentNode); }}>Checking Out</button></li>
          <li><button type="button" onClick={(e) => { handleTabClick('status', 'inprogress', e.target.parentNode); }}>In Progress</button></li>
        </ul>
        <div className="table-tabs__sort">
          <input type="search" name="customerName" id="customerName" placeholder="Search..." onChange={(e) => { handleSearchChange('fullName', e.target.value); }} />
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="orderDate" onChange={(e) => setOrderBy(e.target.value)}>
              <option value="fullName">Guest</option>
              <option value="orderDate">Order Date</option>
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
            bookingsState.map((booking) => (
              <tr key={booking._id} onClick={(e) => checkIsNotAButton(e, () => navigate(`${booking._id}`))}>
                <td>
                  <span>{booking.fullName}</span>
                  <br />
                  <span>
                    #
                    {booking._id}
                  </span>
                </td>
                <td>
                  {dateBuilder(booking.orderDate)}
                </td>
                <td>
                  {dateBuilder(booking.checkIn)}
                </td>
                <td>
                  {dateBuilder(booking.checkOut)}
                </td>
                <td>
                  <Button green onClick={() => throwModal(booking.specialRequest)}>
                    View Notes
                  </Button>
                </td>
                <td>
                  {/* {roomsData.find((room) => room.id === booking.room).type} */}
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
