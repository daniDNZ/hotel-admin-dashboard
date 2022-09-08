/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import bookingsJSONNoTyped from '../../assets/data/bookings.json';
import { IBooking } from './bookingInterface';

const bookingsJSON: any = bookingsJSONNoTyped;

const delay = async (data: any, ms: number) => {
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
    const oneBooking = bookingsJSON.find((element: IBooking) => element.id === Number(id));
    const booking = await delay(oneBooking, 100);
    return booking;
  },
);

export const deleteBooking = createAsyncThunk(
  'bookings/deleteBooking',
  async (id) => {
    const oneBooking = bookingsJSON.find((element: IBooking) => element.id === id);
    const booking = await delay(oneBooking, 100);
    return booking;
  },
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async (id) => {
    const oneBooking = bookingsJSON.find((element: IBooking) => element.id === id);
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

interface IBookingsState {
  bookings: IBooking[];
  booking: IBooking;
  status: string;
}

const initialState: IBookingsState = {
  bookings: [],
  booking: {},
  status: 'loading',
};

export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBookings.fulfilled, (state, action: PayloadAction<Array<IBooking>>) => {
        state.status = 'fulfilled';
        state.bookings = action.payload;
      })
      .addCase(fetchBookings.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooking.fulfilled, (state, action: PayloadAction<IBooking>) => {
        state.status = 'fulfilled';
        state.booking = action.payload;
      })
      .addCase(fetchBooking.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteBooking.fulfilled, (state, action: PayloadAction<IBooking>) => {
        state.status = 'fulfilled';
        state.bookings = state.bookings.filter((booking) => booking.id !== action.payload.id);
      })
      .addCase(deleteBooking.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateBooking.fulfilled, (state, action: PayloadAction<IBooking>) => {
        state.status = 'fulfilled';
        state.bookings = state.booking.filter((booking: IBooking) => booking.id !== action.payload.id);
        state.bookings.push(action.payload);
      })
      .addCase(updateBooking.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(newBooking.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newBooking.fulfilled, (state, action: PayloadAction<IBooking>) => {
        state.status = 'fulfilled';
        state.bookings.push(action.payload);
      })
      .addCase(newBooking.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectBookings = (state: RootState) => state.bookings.bookings;
export const selectBooking = (state: RootState) => state.bookings.booking;

export default bookingsSlice.reducer;
