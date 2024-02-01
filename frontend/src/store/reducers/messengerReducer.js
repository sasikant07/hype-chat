import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  friends: [],
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

export const messegeSend = createAsyncThunk(
  "messenger/send-message",
  async (data, thunkAPI) => {
    try {
      const { data } = await api.post("/messenger/send-message", data);
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
  },
  extraReducers: (builder) => {
    builder.addCase(getFriends.pending, (state) => {
      // state.loading = true;
    });
    builder.addCase(getFriends.fulfilled, (state, action) => {
      // state.loading = false;
      // state.success = action.payload.successMessage;
      state.friends = action.payload.friends;
    });
    builder.addCase(getFriends.rejected, (state, action) => {
      // state.loading = false;
      // state.error = action.payload.error.errorMessage;
    });
  },
});

export const { messageClear } = messengerReducer.actions;

export default messengerReducer.reducer;
