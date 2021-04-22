import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RestaurantApi from "../../api/RestaurantApi";


export const fetchRestaurant = createAsyncThunk(
  `restaurant/fetch`,
  async ({id}, thunkAPI) => {
    try {
      return RestaurantApi.fetch(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restaurantSlice = createSlice({
  name: `restaurant`,
  initialState: {
    restaurant: null,
    isFetching: false,
    isError: false,
    isSuccess: false,
    errorMessage: ``,
  },
  reducers: {
    clearRestaurantState: (state) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [fetchRestaurant.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchRestaurant.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [fetchRestaurant.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.restaurant = payload.restaurant;
    }
  },
});

export const {clearRestaurantState} = restaurantSlice.actions;
export const restaurantSelector = (state) => state.restaurant;