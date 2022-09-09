import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import roomsDataNoTyped from '../../assets/data/rooms.json';
import { Button } from '../../style/styledComponents';
import Modal from '../../components/common/Modal';
import { Table, TableTabs, activeTableTabs } from '../../components/common/Table';
import { fetchBookings, selectBookings } from './bookingsSlice';
import checkIsNotAButton from '../../assets/functions';
import React from 'react';
import { IBooking } from './bookingInterface';
import { IRoom } from '../rooms/roomInterface';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

function Bookings() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const bookingsData: IBooking[] = useAppSelector(selectBookings);
  const roomsData: any = roomsDataNoTyped || [];
  const [modalData, setModalData] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [bookingsState, setBookingsState] = useState<Array<IBooking>>([]);
  const [orderBy, setOrderBy] = useState<string>('orderDate');
  const [filterBy, setFilterBy] = useState<string>('fullName');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const throwModal = (data: string) => {
    setOpenModal(true);
    setModalData(data);
  };

  const handleTabClick = (filter: string, value: string, parentNode: ParentNode | null) => {
    if (parentNode) {
      activeTableTabs(parentNode as HTMLElement);
    }
    setFilterBy(filter);
    setSearchTerm(value);
  };

  const handleSearchChange = (filter: string, value: string) => {
    setFilterBy(filter);
    setSearchTerm(value);

    const defaultTab = document.querySelector('#defaultTab');
    if (defaultTab) activeTableTabs(defaultTab as HTMLElement);
  };

  useEffect(() => {
    const orderedFilteredBookings = bookingsData.filter(
      (booking: IBooking) => booking[filterBy].toLowerCase().includes(searchTerm.toLowerCase()),
    );
    orderedFilteredBookings.sort((a, b) => {
      if (a[orderBy] > b[orderBy]) return 1;
      if (a[orderBy] < b[orderBy]) return -1;
      return 0;
    });
    setBookingsState(orderedFilteredBookings);
  }, [bookingsData, orderBy, searchTerm, filterBy]);

  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab" id="defaultTab"><button type="button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleTabClick('fullName', '', (e.target as HTMLElement).parentNode); }}>All Bookings</button></li>
          <li><button type="button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleTabClick('status', 'checkin', (e.target as HTMLElement).parentNode); }}>Checking In</button></li>
          <li><button type="button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleTabClick('status', 'checkout', (e.target as HTMLElement).parentNode); }}>Checking Out</button></li>
          <li><button type="button" onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleTabClick('status', 'inprogress', (e.target as HTMLElement).parentNode); }}>In Progress</button></li>
        </ul>
        <div className="table-tabs__sort">
          <input type="search" name="customerName" id="customerName" placeholder="Search..." onChange={(e: React.ChangeEvent<HTMLInputElement>) => { handleSearchChange('fullName', e.target.value); }} />
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="orderDate" onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setOrderBy(e.target.value)}>
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
            bookingsState.map((booking: IBooking) => (
              <tr key={booking.id} onClick={(e: React.MouseEvent<HTMLElement>) => checkIsNotAButton(e, () => navigate(`${booking.id}`))}>
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
                  {roomsData.find((room: IRoom) => room.id === booking.room)?.type}
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
    </div >
  );
}

export default Bookings;
