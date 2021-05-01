import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OrderApi} from "../../api/OrderApi";

export const createOrder = createAsyncThunk(
  `order/create`,
  async ({restaurantId, userId, menuItem, topping}, thunkAPI) => {
    try {
      return await OrderApi.createOrder(restaurantId, userId, menuItem, topping);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addItem = createAsyncThunk(
  `order/addItem`,
  async ({}, thunkAPI) => {
    try {
      return await OrderApi.addItem()
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isRequesting: false,
    isError: false,
    isSuccess: false,
    isEmpty: false,
    data: {},
  },
  reducers: {
    clearOrderState: (state) => {
      state.isRequesting = false;
      state.isError = false;
      state.isSuccess = false;
      state.isEmpty = false;
      return state;
    },
  },
  extraReducers: {
    [createOrder.fulfilled]: (state, {payload}) => {
      state.isRequesting = false;
      state.isSuccess = true;
      console.log(payload);
      state.data = payload;
    },
    [createOrder.pending]: (state) => {
      state.isRequesting = true;
    },
    [createOrder.rejected]: (state, {payload}) => {
      state.isRequesting = false;
      state.isError = true;
      state.errorMessage = payload.message;
    }
  },
});

export const {clearOrderState} = orderSlice.actions;
export const orderSelector = (state) => state.order;