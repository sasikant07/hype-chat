import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  friends: [],
  message: [],
  messageSendSuccess: false,
  messageGetSuccess: false,
  theme: "",
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

export const seenMessage = createAsyncThunk(
  "messenger/seen-message",
  async (msg, thunkAPI) => {
    try {
      const { data } = await api.post(`/messenger/seen-message`, msg);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateMessage = createAsyncThunk(
  "messenger/delivered-message",
  async (msg, thunkAPI) => {
    try {
      const { data } = await api.post(`/messenger/delivered-message`, msg);
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
      state.messageSendSuccess = false;
    },
    sendSocketMessage: (state, action) => {
      state.message = [...state.message, action.payload.message];
    },
    updateFriendMessage: (state, action) => {
      const index = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === action.payload.msgInfo.receiverId ||
          f.fndInfo._id === action.payload.msgInfo.senderId
      );
      state.friends[index].msgInfo = action.payload.msgInfo;
      // state.friends[index].msgInfo.status = action.payload.status;
    },
    messegeSeen: (state, action) => {
      const index = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === action.payload.msgInfo.receiverId ||
          f.fndInfo._id === action.payload.msgInfo.senderId
      );
      state.friends[index].msgInfo.status = "seen";
    },
    messageDelivered: (state, action) => {
      const index = state.friends.findIndex(
        (f) =>
          f.fndInfo._id === action.payload.msgInfo.receiverId ||
          f.fndInfo._id === action.payload.msgInfo.senderId
      );
      state.friends[index].msgInfo.status = "delivered";
    },
    updateFriend: (state, action) => {
      const index = state.friends.findIndex(
        (f) => f.fndInfo._id === action.payload.id
      );
      if (state.friends[index].msgInfo) {
        state.friends[index].msgInfo.status = "seen";
      }
    },
    messageGetSuccessClear: (state) => {
      state.messageGetSuccess = false;
    },
    seenAll: (state, action) => {
      const index = state.friends.findIndex(
        (f) => f.fndInfo._id === action.payload.receiverId
      );
      state.friends[index].msgInfo.status = "seen";
    },
    getTheme: (state, action) => {
      state.theme = action.payload.theme;
    },
    themeSet: (state, action) => {
      localStorage.setItem("theme", action.payload.theme);
      state.theme = action.payload.theme;
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
      state.messageSendSuccess = true;
      state.message = [...state.message, action.payload.message];
    });
    builder.addCase(imageMessageSend.fulfilled, (state, action) => {
      state.message = [...state.message, action.payload.message];
    });
    builder.addCase(getMessage.fulfilled, (state, action) => {
      state.messageGetSuccess = true;
      state.message = action.payload.message;
    });
  },
});

export const {
  messageClear,
  sendSocketMessage,
  updateFriendMessage,
  messegeSeen,
  messageDelivered,
  updateFriend,
  messageGetSuccessClear,
  seenAll,
  getTheme,
  themeSet,
} = messengerReducer.actions;

export default messengerReducer.reducer;
