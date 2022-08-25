import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchRoom, selectRoom } from './roomsSlice';

function Room() {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRoom(id));
  }, []);

  if (!room) {
    return 'Loading...';
  }

  return (
    <div>
      <div>
        Col 1
        <div>Col 1.1 Img</div>
        <div>
          Col 1.2
          <div>
            <div style={{ display: 'inline-block' }}>
              <span>
                {`${room.type} ${room.number}`}
              </span>
              <span style={{ display: 'block' }}>{room.id}</span>
            </div>
            <div style={{ display: 'inline-block' }}>...</div>
          </div>
        </div>
        <hr />
        <div>
          <div>
            <span>Price</span>
            <span style={{ display: 'block' }}>
              {room.price}
              {' '}
              €
            </span>
          </div>
        </div>
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
        <span style={{ display: 'block' }}>{room.description}</span>
      </div>
    </div>
  );
}

export default Room;
