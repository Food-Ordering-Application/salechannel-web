import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserApi from "../../api/UserApi";

export const loginUser = createAsyncThunk(
  `user/login`,
  async ({phoneNumber, password}, thunkAPI) => {
    try {
      const data = await UserApi.login(phoneNumber, password);
      localStorage.setItem(`token`, data.access_token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const requestOTP = createAsyncThunk(
  `user/requestOTP`,
  async (token, thunkAPI) => {
    try {
      await UserApi.requestOTP(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: `user`,
  initialState: {
    id: '',
    phoneNumber: '',
    name: '',
    gender: '',
    avatar: '',
    email: '',
    isPhoneNumberVerified: false,
    accessToken: '',
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isSuccess = false;
      return state;
    },
    setUser: (state, action) => {
      const {user, access_token} = action.payload;
      state.phoneNumber = user.phoneNumber;
      state.accessToken = access_token;
    },
    removeUser: (state) => {
      state.phoneNumber = undefined;
      state.accessToken = undefined;
    }
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, {payload}) => {
      const user = payload.user;
      state.id = user.id;
      state.phoneNumber = user.phoneNumber;
      state.name = user.name;
      state.gender = user.gender;
      state.avatar = user.avatar;
      state.email = user.email;
      state.isPhoneNumberVerified = user.isPhoneNumberVerified;
      state.accessToken = payload.access_token;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.pending]: (state) => {
      state.isFetching = true;
    },
    [loginUser.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [requestOTP.pending]: (state) => {
      state.isFetching = true;
    },
    [requestOTP.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [requestOTP.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.isError = false;
      state.errorMessage = payload;
    },
  }
});

export const {clearState, setUser, removeUser} = userSlice.actions;
export const userSelector = (state) => state.user;