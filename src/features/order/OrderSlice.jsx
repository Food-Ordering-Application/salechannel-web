import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

const createOrder = createAsyncThunk(
  `order/create`,
  async (payload, thunkAPI) => {
    try {
      return {};
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
  extraReducers: {},
});

export const {clearOrderState} = orderSlice.actions;
export const orderSelector = (state) => state.order;