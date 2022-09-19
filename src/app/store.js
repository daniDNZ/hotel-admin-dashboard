import { configureStore } from '@reduxjs/toolkit';
import bookingsSliceReducer from '../features/bookings/bookingsSlice';
import roomsSliceReducer from '../features/rooms/roomsSlice';
import usersSliceReducer from '../features/users/usersSlice';
import messagesSliceReducer from '../features/messages/messagesSlice';

const store = configureStore({
  reducer: {
    bookings: bookingsSliceReducer,
    rooms: roomsSliceReducer,
    users: usersSliceReducer,
    messages: messagesSliceReducer,
  },
});

export default store;
