/* eslint-disable no-underscore-dangle */
import update from 'immutability-helper';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table, TableTabs, activeTableTabs,
} from '../../components/common/Table';
import RoomRow from './RoomRow';
import { fetchRooms, selectRooms } from './roomsSlice';

function Rooms() {
  const dispatch = useDispatch();
  const roomsData = useSelector(selectRooms).rooms;
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
    if (roomsData) {
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
    }
  }, [roomsData, orderBy, searchTerm]);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);

  // DnD
  const moveRow = useCallback((dragIndex, hoverIndex) => {
    setRoomsState((prevRows) => update(prevRows, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, prevRows[dragIndex]],
      ],
    }));
  }, []);
  const renderRow = useCallback((row, index) => (
    <RoomRow
      key={row._id}
      index={index}
      id={row.id}
      room={row}
      moveRow={moveRow}
    />
  ), []);

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
            roomsState.map((room, i) => renderRow(room, i))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Rooms;
