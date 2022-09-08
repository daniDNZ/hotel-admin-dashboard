/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import roomsJSONNoTyped from '../../assets/data/rooms.json';
import { IRoom } from './roomInterface';
import { RootState } from '../../app/store';

const roomsJSON: any = roomsJSONNoTyped;

const delay = async (data: any, ms: number) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, ms));
  return data;
};

export const fetchRooms = createAsyncThunk(
  'rooms/fetchRooms',
  async () => {
    const rooms = await delay(roomsJSON, 100);
    return rooms;
  },
);

export const fetchRoom = createAsyncThunk(
  'rooms/fetchRoom',
  async (id) => {
    const oneRoom = roomsJSON.find((element: IRoom) => element.id === Number(id));
    const room = await delay(oneRoom, 100);
    return room;
  },
);

export const deleteRoom = createAsyncThunk(
  'rooms/deleteRoom',
  async (id) => {
    const oneRoom = roomsJSON.find((element: IRoom) => element.id === id);
    const room = await delay(oneRoom, 100);
    return room;
  },
);

export const updateRoom = createAsyncThunk(
  'rooms/updateRoom',
  async (updatedRoom) => {
    const room = await delay(updatedRoom, 100);
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

interface IRoomsState {
  rooms: IRoom[];
  room: IRoom;
  status: string;
}

const initialState: IRoomsState = {
  rooms: [],
  room: {},
  status: 'loading',
};

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRooms.fulfilled, (state, action: PayloadAction<Array<IRoom>>) => {
        state.status = 'fulfilled';
        state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRoom.fulfilled, (state, action: PayloadAction<IRoom>) => {
        state.status = 'fulfilled';
        state.room = action.payload;
      })
      .addCase(fetchRoom.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteRoom.fulfilled, (state, action: PayloadAction<IRoom>) => {
        state.status = 'fulfilled';
        state.rooms = state.rooms.filter((room) => room.id !== action.payload.id);
      })
      .addCase(deleteRoom.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateRoom.fulfilled, (state, action: PayloadAction<IRoom>) => {
        state.status = 'fulfilled';
        state.rooms = state.rooms.filter((room: IRoom) => room.id !== action.payload.id);
        state.rooms.push(action.payload);
      })
      .addCase(updateRoom.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(newRoom.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newRoom.fulfilled, (state, action: PayloadAction<IRoom>) => {
        state.status = 'fulfilled';
        state.rooms.push(action.payload);
      })
      .addCase(newRoom.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectRooms = (state: RootState) => state.rooms.rooms;
export const selectRoom = (state: RootState) => state.rooms.room;

export default roomsSlice.reducer;
