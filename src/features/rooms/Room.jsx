import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Amenitie, AmenitiesContainer, SingleView } from '../../style/styledComponents';
import { fetchRoom, selectRoom } from './roomsSlice';

function Room() {
  const dispatch = useDispatch();
  const room = useSelector(selectRoom);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchRoom(id));
  }, []);

  if (!room || Object.keys(room).length === 0) {
    return 'Loading...';
  }

  return (
    <SingleView>
      <div className="single-view__container">

        <div>
          <div className="single-view__header">
            <div>
              <span className="single-view__title">
                {`${room.type} ${room.number}`}
              </span>
              <span className="single-view__id">
                #
                {room.id}
              </span>
            </div>
            <button type="button" className="single-view__menu">...</button>
          </div>
          <hr />
          <div className="single-view__body">
            <div>
              <span className="single-view__body-title">Price</span>
              <span className="single-view__body-subtitle">
                {room.price}
                {' '}
                €
              </span>
            </div>
            <div>
              <span className="single-view__body-title">Discount</span>
              <span className="single-view__body-subtitle">
                {room.discount}
                {' '}
                %
              </span>
            </div>
            <div>
              <span className="single-view__body-title">Offer</span>
              <span className="single-view__body-subtitle">
                {room.discount > 0 ? 'Yes' : 'No'}
              </span>
            </div>
          </div>
          <div>
            <span className="single-view__body-title">Amenities</span>
            <AmenitiesContainer>
              {room.amenities.map((amenitie) => (
                <Amenitie key={`am-${amenitie}`}>
                  {amenitie}
                </Amenitie>
              ))}
            </AmenitiesContainer>
          </div>
        </div>
        <div>
          {/* <div>
            Carousel
            {' '}
            {room.photos}
            <button type="button">prev</button>
            <button type="button">next</button>
          </div> */}
          <div>
            <span className="single-view__body-title">Description</span>
            <span className="single-view__body-text">
              {room.description}
            </span>
          </div>
          <div>
            <span className="single-view__body-title">Cancellation</span>
            <span className="single-view__body-text">
              {room.cancellation}
            </span>
          </div>
          <span style={{ display: 'block' }}>{room.description}</span>
        </div>
      </div>
    </SingleView>
  );
}

export default Room;
