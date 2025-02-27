import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setChannels, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
