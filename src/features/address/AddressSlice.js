import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import UserApi from "../../api/UserApi";

/*
DEFAULT HANDLER
 */

const handlePendingDefault = (state) => {
  state.isPending = true;
};

const handleErrorDefault = (state, {payload}) => {
  state.isPending = true;
  state.isError = true;
  state.errorMessage = payload;
};

/*
REDUX THUNK
 */

export const fetchAddress = createAsyncThunk(
  `address/fetch`,
  async ({userId}, thunkAPI) => {
    try {
      return await UserApi.fetchAddress(userId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteAddress = createAsyncThunk(
  `address/delete`,
  async ({userId, addressId}, thunkAPI) => {
    try {
      await UserApi.deleteAddress(userId, addressId);
      return {addressId};
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addAddress = createAsyncThunk(
  `address/add`,
  async ({userId, address, longitude, latitude}, thunkAPI) => {
    try {
      return await UserApi.addAddress(userId, address, longitude, latitude);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

/*
REDUX SLICE
 */

export const addressSlice = createSlice({
  name: `address`,
  initialState: {
    data: [],
    isPending: false,
    isError: false,
    isSuccess: false,
    isEmpty: true,
    errorMessage: '',
  },
  reducers: {
    clearAddressState: (state) => {
      state.isPending = false;
      state.isError = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
  },
  extraReducers: {
    [fetchAddress.pending]: handlePendingDefault,
    [fetchAddress.rejected]: handleErrorDefault,
    [fetchAddress.fulfilled]: (state, {payload: {customerAddresses}}) => {
      state.isPending = false;
      state.isSuccess = true;
      state.data = customerAddresses;
    },
    [deleteAddress.pending]: handlePendingDefault,
    [deleteAddress.rejected]: handleErrorDefault,
    [deleteAddress.fulfilled]: (state, {payload: {addressId}}) => {
      state.isPending = false;
      state.isSuccess = true;
      state.data = state.data.filter((address) => address.id !== addressId);
    },
    [addAddress.pending]: handlePendingDefault,
    [addAddress.rejected]: handleErrorDefault,
    [addAddress.fulfilled]: (state, {payload}) => {
      const {customerAddress: newAddress} = payload;
      newAddress[`customer`] = undefined;
      state.isPending = false;
      state.isSuccess = true;
      state.data.push(newAddress);
    },
  }
});

export const {clearAddressState} = addressSlice.actions;
export const addressSelector = (state) => state.address;