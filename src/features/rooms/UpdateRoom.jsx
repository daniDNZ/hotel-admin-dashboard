import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StyledForm from '../../components/common/Form';
import { Button, Subtitle } from '../../style/styledComponents';
import { fetchRoom, selectRoom, updateRoom } from './roomsSlice';

function UpdateRoom() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const room = useSelector(selectRoom);
  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateRoom(formData));
  };

  const handleCheckbox = (e) => {
    if (e.target.checked) {
      const { amenities } = formData;
      setFormData({ ...formData, amenities: [...amenities, e.target.value] });
    } else {
      const amenities = formData.amenities.filter((amenitie) => amenitie !== e.target.value);
      setFormData({ ...formData, amenities });
    }
  };

  useEffect(() => {
    dispatch(fetchRoom(id));
  }, []);

  useEffect(() => {
    setFormData(room);
  }, [room]);

  if (!formData.id) {
    return 'Loading...';
  }

  return (
    <div>
      <Subtitle>Update Room</Subtitle>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="photos">
          Photos:
          <input type="text" name="photos" id="photos" defaultValue={formData.photos} onChange={(e) => setFormData({ ...formData, photos: e.target.value })} />
        </label>
        <label htmlFor="type">
          Type:
          <select name="type" id="type" defaultValue={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Double Superior">Double Superior</option>
            <option value="Suite">Suite</option>
          </select>
        </label>
        <label htmlFor="number">
          Number:
          <input type="text" name="number" id="number" defaultValue={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
        </label>
        <label htmlFor="description">
          Description:
          <input type="text" name="description" id="description" defaultValue={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </label>
        <label htmlFor="offer">
          Offer:
          <input type="radio" name="offer" id="offer" checked={formData.offer} onChange={(e) => setFormData({ ...formData, offer: e.target.value })} />
        </label>
        <label htmlFor="price">
          Price:
          <input type="text" name="price" id="price" defaultValue={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        </label>
        <label htmlFor="discount">
          Discount (%):
          <input type="text" name="discount" id="discount" defaultValue={formData.discount} onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
        </label>
        <label htmlFor="cancellation">
          Cancellation:
          <textarea name="cancellation" id="cancellation" rows="5" defaultValue={formData.cancellation} onChange={(e) => setFormData({ ...formData, cancellation: e.target.value })} />
        </label>
        <h3>Amenities:</h3>
        <div id="amenities">
          <label htmlFor="Wi-Fi">
            <input type="checkbox" className="amenitie" name="Wi-Fi" id="Wi-Fi" value="Wi-Fi" checked={formData.amenities.includes('Wi-Fi')} onChange={handleCheckbox} />
            Wi-Fi
          </label>
          <label htmlFor="TV">
            <input type="checkbox" className="amenitie" name="TV" id="TV" value="TV" checked={formData.amenities.includes('TV')} onChange={handleCheckbox} />
            TV
          </label>
          <label htmlFor="Bathtub">
            <input type="checkbox" className="amenitie" name="Bathtub" id="Bathtub" value="Bathtub" checked={formData.amenities.includes('Bathhub')} onChange={handleCheckbox} />
            Bathtub
          </label>
          <label htmlFor="AC">
            <input type="checkbox" className="amenitie" name="AC" id="AC" value="AC" checked={formData.amenities.includes('AC')} onChange={handleCheckbox} />
            AC
          </label>
        </div>
        <Button green>
          <input type="submit" value="Modify" />
        </Button>
      </StyledForm>
    </div>
  );
}

export default UpdateRoom;
