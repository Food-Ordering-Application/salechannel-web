import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RestaurantApi from "../../api/RestaurantApi";

export const filterRestaurant = createAsyncThunk(
  `restaurants/filter`,
  async ({pageIndex, rowsPerPage = 25, area, category, name, append = false}, thunkAPI) => {
    try {
      const data = await RestaurantApi.filter(pageIndex, rowsPerPage, area, category, name);
      return {...data, append};
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const restaurantsListSlice = createSlice({
  name: `restaurants`,
  initialState: {
    data: [],
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
      if (payload.append) {
        // state.data = [...(state.data), ...(payload.restaurants)];
        state.data = payload.restaurants.filter((restaurant) => restaurant.id === `75d1fd95-9699-4f21-85e6-480def4d8bbb`);
      } else {
        state.data = payload.restaurants.filter((restaurant) => restaurant.id === `75d1fd95-9699-4f21-85e6-480def4d8bbb`);
      }
    }
  },
});

export const {clearRestaurantsListState} = restaurantsListSlice.actions;
export const restaurantsListSelector = (state) => state.restaurants;