import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RestaurantApi from "../../api/RestaurantApi";

export const filterRestaurant = createAsyncThunk(
  `restaurants/filter`,
  async ({pageIndex, area, category}, thunkAPI) => {
    try {
      return await RestaurantApi.filter(pageIndex, area, category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restaurantsListSlice = createSlice({
  name: `restaurants`,
  initialState: {
    restaurants: [],
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
  },
  reducers: {
    clearRestaurantsListState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      return state;
    }
  },
  extraReducers: {
    [filterRestaurant.pending]: (state) => {
      state.isFetching = true;
    },
    [filterRestaurant.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [filterRestaurant.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.restaurants = payload.restaurants;
    }
  },
});

export const {clearRestaurantsListState} = restaurantsListSlice.actions;
export const restaurantsListSelector = (state) => state.restaurants;