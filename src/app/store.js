import { configureStore } from '@reduxjs/toolkit';
import bookingsSliceReducer from '../features/bookings/bookingsSlice';

const store = configureStore({
  reducer: {
    bookings: bookingsSliceReducer,
  },
});

export default store;
