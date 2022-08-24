/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import bookingsJSON from '../../assets/data/bookings.json';

const delay = async (data, ms) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, ms));
  return data;
};

export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async () => {
    const bookings = await delay(bookingsJSON, 100);
    return bookings;
  },
);

export const fetchBooking = createAsyncThunk(
  'bookings/fetchBooking',
  async (id) => {
    const oneBooking = bookingsJSON.find((element) => element.id === id);
    const booking = await delay(oneBooking, 100);
    return booking;
  },
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (id) => {
    const oneBooking = bookingsJSON.find((element) => element.id === id);
    const booking = await delay(oneBooking, 100);
    return booking;
  },
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async (id) => {
    const oneBooking = bookingsJSON.find((element) => element.id === id);
    const booking = await delay(oneBooking, 100);
    return booking;
  },
);

export const newBooking = createAsyncThunk(
  'bookings/newBooking',
  async (oneNewBooking) => {
    const booking = await delay(oneNewBooking, 100);
    return booking;
  },
);

const initialState = {
  bookings: [],
  booking: {},
  status: 'loading',
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.booking = action.payload;
      })
      .addCase(fetchBooking.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload.id);
      })
      .addCase(deleteBooking.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.bookings = state.booking.filter((booking) => booking.id !== action.payload.id);
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(newBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newBooking.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.bookings.push(action.payload);
      })
      .addCase(newBooking.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectBookings = (state) => state.bookings.bookings;
export const selectBooking = (state) => state.bookings.booking;

export default bookingsSlice.reducer;
