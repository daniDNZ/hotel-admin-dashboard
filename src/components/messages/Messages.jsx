import messagesData from '../../assets/data/messages.json';
import { Button } from '../../style/styledComponents';
import { Table, TableTabs, activeTableTabs } from '../common/Table';

function Messages() {
  const filterMessages = (e) => {
    activeTableTabs(e.target.parentNode);
  };
  const sortMessages = (e) => e;
  return (
    <div>
      <TableTabs>
        <ul className="table-tabs__list">
          <li className="active-table-tab"><button type="button" onClick={filterMessages}>All Contacts</button></li>
          <li><button type="button" onClick={filterMessages}>Archived</button></li>
        </ul>
        <div className="table-tabs__sort">
          <div>
            <select name="sortBookings" id="sortBookings" defaultValue="date" onChange={sortMessages}>
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
            messagesData.map((message) => (
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
