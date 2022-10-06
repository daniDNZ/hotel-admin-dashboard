/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apiFetch from '../../api-fetch/api-fetch';

const delay = async (data, ms) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, ms));
  return data;
};

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async () => {
    const options = {
      url: 'rooms',
      method: 'GET',
    };
    const rooms = await apiFetch(options);
    return rooms;
  },
);

export const fetchRoom = createAsyncThunk(
  'rooms/fetchRoom',
  async (id) => {
    const options = {
      url: `rooms/${id}`,
      method: 'GET',
    };
    const room = await apiFetch(options);
    return room;
  },
);

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (id) => {
    const options = {
      url: `rooms/${id}`,
      method: 'DELETE',
    };
    await apiFetch(options);
    return id;
  },
);

export const updateRoom = createAsyncThunk(
  'rooms/updateRoom',
  async (updatedRoom) => {
    const options = {
      url: `rooms/${updatedRoom._id}`,
      method: 'PATCH',
      body: updatedRoom,
    };
    const room = await apiFetch(options);
    return room;
  },
);

export const newRoom = createAsyncThunk(
  'rooms/newRoom',
  async (oneNewRoom) => {
    const room = await delay(oneNewRoom, 100);
    return room;
  },
);

const initialState = {
  rooms: [],
  room: {},
  status: 'loading',
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.room = action.payload;
      })
      .addCase(fetchRoom.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRoom.fulfilled, (state) => {
        state.status = 'fulfilled';
      })
      .addCase(deleteRoom.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.rooms = state.rooms.filter((room) => room.id !== action.payload.id);
        state.rooms.push(action.payload);
      })
      .addCase(updateRoom.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(newRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newRoom.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.rooms.push(action.payload);
      })
      .addCase(newRoom.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoom = (state) => state.rooms.room;

export default roomsSlice.reducer;
