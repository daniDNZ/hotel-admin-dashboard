import messagesData from '../../assets/data/messages.json';

function Messages() {
  return (
    <div>
      <h1>Messages</h1>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
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
                  <input type="checkbox" id={message.id} />
                </td>
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
                  <button type="button">Archive</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Messages;
