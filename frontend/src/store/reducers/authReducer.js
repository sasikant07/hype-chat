import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);

    return userInfo;
  } else {
    return "";
  }
};

const initialState = {
  loading: false,
  authenticate: false,
  error: "",
  success: "",
  myInfo: decodeToken(localStorage.getItem("authToken")),
};

export const userRegister = createAsyncThunk(
  "auth/user-register",
  async (info, thunkAPI) => {
    try {
      const { data } = await api.post("/messenger/user-register", info);
      localStorage.setItem("authToken", data.token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/user-login",
  async (info, thunkAPI) => {
    try {
      const { data } = await api.post("/messenger/user-login", info);
      localStorage.setItem("authToken", data.token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state, _) => {
      state.error = "";
      state.success = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.successMessage;
      const myInfo = decodeToken(action.payload.token);
      state.myInfo = myInfo;
      state.authenticate = true;
    });
    builder.addCase(userRegister.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.errorMessage;
      state.authenticate = false;
      state.myInfo = "";
    });
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.successMessage;
      const myInfo = decodeToken(action.payload.token);
      state.myInfo = myInfo;
      state.authenticate = true;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.error.errorMessage;
      state.authenticate = false;
      state.myInfo = "";
    });
  },
});

export const { messageClear } = authReducer.actions;

export default authReducer.reducer;
