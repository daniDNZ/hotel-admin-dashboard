/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingsJSON from '../../assets/data/bookings.json';

export const searchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    // eslint-disable-next-line no-promise-executor-return
    await new Promise((resolve) => setTimeout(resolve, 100));
    return bookingsJSON;
  },
);

const initialState = {
  data: [],
  status: 'loading',
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    newBooking: (state, action) => {
      state.bookings = [...state.bookings, action.payload];
    },
    updateBooking: (state, action) => {
      const bookingRemoved = state.filter((booking) => booking.id !== action.payload.id);
      state.bookings = [...bookingRemoved, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchBookings.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data = action.payload;
      })
      .addCase(searchBookings.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const { newBooking, updateBooking } = bookingsSlice.actions;

export const selectBookings = (state) => state.bookings.data;

export default bookingsSlice.reducer;
