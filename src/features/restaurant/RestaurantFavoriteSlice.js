import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RestaurantApi from "../../api/RestaurantApi";

export const fetchFavoriteRestaurant = createAsyncThunk(
  `favoriteRestaurants/fetch`,
  async ({page = 0, size = 10}, thunkAPI) => {
    try {
      return await RestaurantApi.fetchFavorite(page, size);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const restaurantFavoriteSlice = createSlice({
  name: `favoriteRestaurants`,
  initialState: {
    isFetching: false,
    fetchingSuccess: false,
    fetchingError: false,
    errorMessage: ``,
    data: [],
  },
  reducers: {
    clearFavRestaurantState: (state) => {
      state.isFetching = false;
      state.fetchingError = false;
      state.fetchingSuccess = false
    }
  },
  extraReducers: {
    [fetchFavoriteRestaurant.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchFavoriteRestaurant.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.fetchingError = true;
      state.errorMessage = payload;
    },
    [fetchFavoriteRestaurant.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.fetchingSuccess = true;
      state.data = payload.restaurants;
    }
  }
});

export const {clearFavRestaurantState} = restaurantFavoriteSlice.actions;
export const favoriteRestaurantSelector = (state) => state.favoriteRestaurants;