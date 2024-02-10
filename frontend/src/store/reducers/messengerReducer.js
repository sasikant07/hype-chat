import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  friends: [],
  message: [],
};

export const getFriends = createAsyncThunk(
  "messenger/get-friends",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/messenger/get-friends");
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const messageSend = createAsyncThunk(
  "messenger/send-message",
  async (info, thunkAPI) => {
    try {
      const { data } = await api.post("/messenger/send-message", info);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const imageMessageSend = createAsyncThunk(
  "messenger/image-message-send",
  async (info, thunkAPI) => {
    try {
      const { data } = await api.post("/messenger/image-message-send", info);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getMessage = createAsyncThunk(
  "messenger/get-message",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get(`/messenger/get-message/${id}`);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const messengerReducer = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      // state.error = "";
      // state.success = "";
    },
    sendSocketMessage: (state, action) => {
      state.message = [...state.message, action.payload.message];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      state.friends = action.payload.friends;
    });
    builder.addCase(messageSend.fulfilled, (state, action) => {
      state.message = [...state.message, action.payload.message];
    });
    builder.addCase(imageMessageSend.fulfilled, (state, action) => {
      state.message = [...state.message, action.payload.message];
    });
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.message = action.payload.message;
    });
  },
});

export const { messageClear, sendSocketMessage } = messengerReducer.actions;

export default messengerReducer.reducer;
