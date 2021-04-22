import {createSlice} from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    clearOrderState: (state) => {

    }
  },
  extraReducers: {},
});

export const {} = orderSlice.actions;
export const orderSelector = (state) => state.order;