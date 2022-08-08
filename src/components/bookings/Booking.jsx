import { useParams } from 'react-router-dom';

function Booking() {
  const { id } = useParams();
  return (
    <div>
      <h1>
        Booking
        {' '}
        {id}
      </h1>
    </div>
  );
}

export default Booking;
