import { useEffect, useState } from 'react';
import messagesData from '../../assets/data/messages.json';
import { Button } from '../../style/styledComponents';
import { Table, TableTabs, activeTableTabs } from '../common/Table';

function Messages() {
  const [messagesState, setMessagesState] = useState([]);
  const [orderBy, setOrderBy] = useState('date');
  const [filterBy, setFilterBy] = useState('status');
  const [searchTerm, setSearchTerm] = useState('');

  const handleTabClick = (filter, value, parentNode) => {
    activeTableTabs(parentNode);
    setFilterBy(filter);
    setSearchTerm(value);
  };

  useEffect(() => {
    const orderedFilteredMessages = messagesData.filter(
      (message) => message[filterBy].toLowerCase().includes(searchTerm.toLowerCase()),
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
  }, [messagesData, orderBy, searchTerm]);
  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab"><button type="button" onClick={(e) => handleTabClick('customer', '', e.target.parentNode)}>All Contacts</button></li>
          <li><button type="button" onClick={(e) => handleTabClick('status', 'archived', e.target.parentNode)}>Archived</button></li>
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
              <tr key={message.id}>
                <td>
                  <span>
                    {message.date}
                  </span>
                  <br />
                  <span>
                    #
                    {message.id}
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
