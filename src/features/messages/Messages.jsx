/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../style/styledComponents';
import { Table, TableTabs, activeTableTabs } from '../../components/common/Table';
import { fetchMessages, selectMessages } from './messagesSlice';
import { dateBuilder } from '../../assets/functions';

function Messages() {
  const dispatch = useDispatch();
  const messagesData = useSelector(selectMessages).messages;
  const [messagesState, setMessagesState] = useState([]);
  const [orderBy, setOrderBy] = useState('date');
  const [filterBy, setFilterBy] = useState('customer');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabClick = (filter, value, parentNode) => {
    activeTableTabs(parentNode);
    setFilterBy(filter);
    setSearchTerm(value);
  };

  useEffect(() => {
    if (messagesData) {
      const orderedFilteredMessages = messagesData.filter(
        typeof searchTerm === 'string'
          ? (message) => message[filterBy].toLowerCase().includes(searchTerm.toLowerCase())
          : (message) => message[filterBy] === searchTerm,
      );
      orderedFilteredMessages.sort((a, b) => {
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
      setMessagesState(orderedFilteredMessages);
    }
  }, [messagesData, orderBy, searchTerm]);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);
  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab"><button type="button" onClick={(e) => handleTabClick('customer', '', e.target.parentNode)}>All Contacts</button></li>
          <li><button type="button" onClick={(e) => handleTabClick('status', false, e.target.parentNode)}>Archived</button></li>
        </ul>
        <div className="table-tabs__sort">
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="date" onChange={(e) => setOrderBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="customer">Customer</option>
            </select>
          </div>
        </div>
      </TableTabs>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Comment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            messagesState.map((message) => (
              <tr key={message._id}>
                <td>
                  <span>
                    {dateBuilder(message.date)}
                  </span>
                  <br />
                  <span>
                    #
                    {message._id}
                  </span>
                </td>
                <td>
                  <span>{message.customer}</span>
                  <br />
                  <span>{message.email}</span>
                  <br />
                  <span>{message.phone}</span>
                </td>
                <td>
                  <span>{message.subject}</span>
                  <p>{message.comment}</p>
                </td>
                <td>
                  <Button>Archive</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Messages;
