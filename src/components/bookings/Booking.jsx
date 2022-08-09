import { useParams } from 'react-router-dom';
import bookingData from '../../assets/data/bookings.json';
import rooms from '../../assets/data/rooms.json';

function Booking() {
  const { id } = useParams();
  const booking = bookingData.find((item) => item.id === Number(id));
  const room = rooms.find((item) => item.id === booking.room);

  return (
    <div>
      <div>
        Col 1
        <div>Col 1.1 Img</div>
        <div>
          Col 1.2
          <div>
            <div style={{ display: 'inline-block' }}>
              <span>{booking.fullName}</span>
              <span style={{ display: 'block' }}>{booking.id}</span>
            </div>
            <div style={{ display: 'inline-block' }}>...</div>
          </div>
          <div>
            <button type="button">phone</button>
            <button type="button">send message</button>
          </div>
        </div>
        <div>
          <div>
            <span>Check In </span>
            <span style={{ display: 'block' }}>{booking.checkIn}</span>
          </div>
          <div>
            <span>Check Out </span>
            <span style={{ display: 'block' }}>{booking.checkOut}</span>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <span>Room info</span>
            <span style={{ display: 'block' }}>
              {room.type}
              {' '}
              {room.number}
            </span>
          </div>
          <div>
            <span>Price</span>
            <span style={{ display: 'block' }}>
              {booking.price}
              {' '}
              €
            </span>
          </div>
        </div>
        <p>{booking.specialRequest}</p>
        <div>
          <span>Amenities</span>
          <div>
            {room.amenities}
          </div>
        </div>
      </div>
      <div>
        Col 2
        <div>
          Carousel
          {' '}
          {room.photos}
          <button type="button">prev</button>
          <button type="button">next</button>
        </div>
        <span>{room.type}</span>
        <span style={{ display: 'block' }}>{room.description}</span>
      </div>
    </div>
  );
}

export default Booking;
