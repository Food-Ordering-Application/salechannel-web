import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserApi from "../../../../../api/UserApi";

export const requestOTP = createAsyncThunk(
  `otp/request`,
  async (token, thunkAPI) => {
    try {
      await UserApi.requestOTP(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const submitOtp = createAsyncThunk(
  `otp/submit`,
  async ({otp, token}, thunkAPI) => {
    try {
      await UserApi.submitOTP(otp, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const otpSlice = createSlice({
  name: `otp`,
  initialState: {
    isDialogOpen: false,
    isRequesting: false,
    isRequestError: false,
    isVerifying: false,
    isVerifySuccess: false,
    isVerifyError: false,
    errorMessage: '',
  },
  reducers: {
    clearOtpState: (state) => {
      state.isRequesting = false;
      state.isRequestError = false;
      state.isVerifying = false;
      state.isVerifySuccess = false;
      state.isVerifyError = false;
      return state;
    },
    closeOtpDialog: (state)=>{
      state.isDialogOpen = false;
    }
  },
  extraReducers: {
    [requestOTP.pending]: (state) => {
      state.isRequesting = true;
    },
    [requestOTP.fulfilled]: (state) => {
      state.isRequesting = false;
      state.isDialogOpen = true;
    },
    [requestOTP.rejected]: (state, {payload}) => {
      state.isRequesting = false;
      state.isRequestError = false;
      state.errorMessage = payload;
    },
    [submitOtp.pending]: (state) => {
      state.isVerifying = true;
    },
    [submitOtp.fulfilled]: (state) => {
      state.isVerifying = false;
      state.isVerifySuccess = true;
      state.isDialogOpen = false;
    },
    [submitOtp.rejected]: (state, {payload}) => {
      state.isVerifying = false;
      state.isVerifyError = true;
      state.errorMessage = payload;
    },
  },
});

export const {clearOtpState, closeOtpDialog} = otpSlice.actions;
export const otpSelector = (state) => state.otp;