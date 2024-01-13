import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {};

export const userRegister = createAsyncThunk(
  "auth/user-register",
  async (info, thunkAPI) => {
    try {
      const { data } = await api.post("/messenger/user-register", info);
      // localStorage.setItem("customerToken", data.token);
      return thunkAPI.fulfillWithValue(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const {} = authReducer.actions;

export default authReducer.reducer;
