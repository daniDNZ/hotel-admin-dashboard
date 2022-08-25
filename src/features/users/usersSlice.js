/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import usersJSON from '../../assets/data/users.json';

const delay = async (data, ms) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, ms));
  return data;
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const users = await delay(usersJSON, 100);
    return users;
  },
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (id) => {
    const oneUser = usersJSON.find((element) => element.id === Number(id));
    const user = await delay(oneUser, 100);
    return user;
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id) => {
    const oneUser = usersJSON.find((element) => element.id === id);
    const user = await delay(oneUser, 100);
    return user;
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (id) => {
    const oneUser = usersJSON.find((element) => element.id === id);
    const user = await delay(oneUser, 100);
    return user;
  },
);

export const newUser = createAsyncThunk(
  'users/newUser',
  async (oneNewUser) => {
    const user = await delay(oneNewUser, 100);
    return user;
  },
);

const initialState = {
  users: [],
  user: {},
  status: 'loading',
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.users = state.users.filter((user) => user.id !== action.payload.id);
      })
      .addCase(deleteUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.users = state.user.filter((user) => user.id !== action.payload.id);
        state.users.push(action.payload);
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(newUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.users.push(action.payload);
      })
      .addCase(newUser.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;

export default usersSlice.reducer;
