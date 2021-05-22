import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserApi from "../../api/UserApi";
import {ImageApi} from "../../api/ImageApi";

const handlePendingDefault = (state) => {
  state.isFetching = true;
}

const handleRejectedDefault = (state, {payload}) => {
  state.isFetching = false;
  state.isError = true;
  state.errorMessage = payload;
}

const handleFulfilledDefault = (state, {payload}) => {
  state.isFetching = false;
  state.isSuccess = true;
  Object.assign(state, payload.user);
}

export const loginUser = createAsyncThunk(
  `user/login`,
  async ({phoneNumber, password}, thunkAPI) => {
    try {
      return await UserApi.login(phoneNumber, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  `user/register`,
  async ({phoneNumber, password}, thunkAPI) => {
    try {
      return await UserApi.register(phoneNumber, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

export const fetchUser = createAsyncThunk(
  `user/fetch`,
  async ({userId}, thunkAPI) => {
    try {
      return await UserApi.fetchUser(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  `user/update`,
  async ({name, avatar, email, gender}, thunkAPI) => {
    try {
      return await UserApi.updateUser(name, avatar, email, gender);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateAvatar = createAsyncThunk(
  `user/updateAvatar`,
  async ({file}, thunkAPI) => {
    try {
      const {thumb: {url: avatar}} = await ImageApi.upload(file);
      return await UserApi.updateUser(undefined, avatar, undefined, undefined);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userSlice = createSlice({
  name: `user`,
  initialState: {
    isAuthenticated: false,
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
    clearUserState: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      return state;
    },
    setUser: (state, action) => {
      const {user, access_token} = action.payload;
      state.phoneNumber = user.phoneNumber;
      state.accessToken = access_token;
    },
    removeUser: (state) => {
      state = {};
      state.isAuthenticated = false;
      localStorage.removeItem(`token`);
      localStorage.removeItem(`id`);
      return state;
    },
    verifyOtpSuccess: (state) => {
      state.isPhoneNumberVerified = true;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, {payload}) => {
      const user = payload.user;
      state.isAuthenticated = true;
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
      localStorage.setItem(`id`, user.id);
      localStorage.setItem(`token`, payload.access_token);
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
    [registerUser.pending]: (state) => {
      state.isFetching = true;
    },
    [registerUser.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [registerUser.fulfilled]: (state) => {
      state.isFetching = false;
      state.isSuccess = true;
    },
    [fetchUser.pending]: handlePendingDefault,
    [fetchUser.rejected]: handleRejectedDefault,
    [fetchUser.fulfilled]: handleFulfilledDefault,
    [updateUser.pending]: handlePendingDefault,
    [updateUser.rejected]: handleRejectedDefault,
    [updateUser.fulfilled]: (state, {payload: {data}}) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.avatar = data.avatar || state.avatar;
      state.name = data.name || state.name;
      state.email = data.email || state.email;
      state.gender = data.gender || state.gender;
    },
    [updateAvatar.pending]: handlePendingDefault,
    [updateAvatar.rejected]: handleRejectedDefault,
    [updateAvatar.fulfilled]: (state, {payload: {data}}) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.avatar = data.avatar || state.avatar;
      state.name = data.name || state.name;
      state.email = data.email || state.email;
      state.gender = data.gender || state.gender;
    }
  }
});

export const {clearUserState, setUser, removeUser, verifyOtpSuccess} = userSlice.actions;
export const userSelector = (state) => state.user;