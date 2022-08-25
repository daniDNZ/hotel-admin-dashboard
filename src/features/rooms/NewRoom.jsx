import { useState } from 'react';
import { useDispatch } from 'react-redux';
import StyledForm from '../../components/common/Form';
import { Button, Subtitle } from '../../style/styledComponents';
import { newRoom } from './roomsSlice';

function NewRoom() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: 'Single Bed',
    number: '',
    price: '',
    amenities: [],
    photos: '',
    description: '',
    offer: '',
    discount: '',
    cancellation: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(newRoom(formData));
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
  return (
    <div>
      <Subtitle>New Room</Subtitle>
      <StyledForm onSubmit={handleSubmit}>
        <label htmlFor="photos">
          Photos:
          <input type="text" name="photos" id="photos" onChange={(e) => setFormData({ ...formData, photos: e.target.value })} />
        </label>
        <label htmlFor="type">
          Type:
          <select name="type" id="type" onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Double Superior">Double Superior</option>
            <option value="Suite">Suite</option>
          </select>
        </label>
        <label htmlFor="number">
          Number:
          <input type="text" name="number" id="number" onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
        </label>
        <label htmlFor="description">
          text:
          <input type="text" name="description" id="description" onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
        </label>
        <label htmlFor="offer">
          <input type="radio" name="offer" id="offer" onChange={(e) => setFormData({ ...formData, offer: e.target.value })} />
          Offer
        </label>
        <label htmlFor="price">
          Price:
          <input type="text" name="price" id="price" onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        </label>
        <label htmlFor="discount">
          Discount (%):
          <input type="text" name="discount" id="discount" onChange={(e) => setFormData({ ...formData, discount: e.target.value })} />
        </label>
        <label htmlFor="cancellation">
          Cancellation:
          <textarea name="cancellation" id="cancellation" rows="5" onChange={(e) => setFormData({ ...formData, cancellation: e.target.value })} />
        </label>
        <h3>Amenities:</h3>
        <div id="amenities">
          <label htmlFor="wifi">
            <input type="checkbox" name="wifi" id="wifi" value="Wi-Fi" onChange={handleCheckbox} />
            Wi-Fi
          </label>
          <label htmlFor="tv">
            <input type="checkbox" name="tv" id="tv" value="TV" onChange={handleCheckbox} />
            TV
          </label>
          <label htmlFor="bathtub">
            <input type="checkbox" name="bathtub" id="bathtub" value="Bathtub" onChange={handleCheckbox} />
            Bathtub
          </label>
          <label htmlFor="ac">
            <input type="checkbox" name="ac" id="ac" value="AC" onChange={handleCheckbox} />
            AC
          </label>
        </div>
        <Button green>
          <input type="submit" value="Create" />
        </Button>
      </StyledForm>
    </div>
  );
}

export default NewRoom;
