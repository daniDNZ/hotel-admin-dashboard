/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import messagesJSON from '../../assets/data/messages.json';

const delay = async (data, ms) => {
  // eslint-disable-next-line no-promise-executor-return
  await new Promise((resolve) => setTimeout(resolve, ms));
  return data;
};

export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async () => {
    const messages = await delay(messagesJSON, 100);
    return messages;
  },
);

export const fetchMessage = createAsyncThunk(
  'messages/fetchMessage',
  async (id) => {
    const oneMessage = messagesJSON.find((element) => element.id === Number(id));
    const message = await delay(oneMessage, 100);
    return message;
  },
);

export const deleteMessage = createAsyncThunk(
  'messages/deleteMessage',
  async (id) => {
    const oneMessage = messagesJSON.find((element) => element.id === id);
    const message = await delay(oneMessage, 100);
    return message;
  },
);

export const updateMessage = createAsyncThunk(
  'messages/updateMessage',
  async (id) => {
    const oneMessage = messagesJSON.find((element) => element.id === id);
    const message = await delay(oneMessage, 100);
    return message;
  },
);

export const newMessage = createAsyncThunk(
  'messages/newMessage',
  async (oneNewMessage) => {
    const message = await delay(oneNewMessage, 100);
    return message;
  },
);

const initialState = {
  messages: [],
  message: {},
  status: 'loading',
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(fetchMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.message = action.payload;
      })
      .addCase(fetchMessage.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(deleteMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.messages = state.messages.filter((message) => message.id !== action.payload.id);
      })
      .addCase(deleteMessage.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(updateMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.messages = state.message.filter((message) => message.id !== action.payload.id);
        state.messages.push(action.payload);
      })
      .addCase(updateMessage.rejected, (state) => {
        state.status = 'error';
      })
      .addCase(newMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newMessage.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.messages.push(action.payload);
      })
      .addCase(newMessage.rejected, (state) => {
        state.status = 'error';
      });
  },
});

export const selectMessages = (state) => state.messages.messages;
export const selectMessage = (state) => state.messages.message;

export default messagesSlice.reducer;
