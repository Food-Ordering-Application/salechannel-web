import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RestaurantApi from "../../api/RestaurantApi";
import {checkRestaurantOpen} from "../../untils/timeChecker";


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
    restaurant: {},
    isFetching: false,
    isError: false,
    isSuccess: false,
    isOpen: true,
    isAbleToDelivery: true,
    errorMessage: ``,
  },
  reducers: {
    clearRestaurantState: (state) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
      return state;
    },
    setAbleToDelivery: (state, {payload}) => {
      state.isAbleToDelivery = payload;
    }
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
      state.isOpen = checkRestaurantOpen(payload.restaurant.openHours);
    }
  },
});

export const {clearRestaurantState, setAbleToDelivery} = restaurantSlice.actions;
export const restaurantSelector = (state) => state.restaurant;