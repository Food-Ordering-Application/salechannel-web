import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RestaurantApi from "../../api/RestaurantApi";
import {checkRestaurantOpen} from "../../untils/timeChecker";


export const fetchRestaurant = createAsyncThunk(
  `restaurant/fetch`,
  async ({id}, thunkAPI) => {
    try {
      return await RestaurantApi.fetch(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const setFavoriteRestaurant = createAsyncThunk(
  `restaurant/setFavorite`,
  async ({restaurantId, isFavorite}, thunkAPI) => {
    try {
      return await RestaurantApi.setFavorite(restaurantId, isFavorite);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


//TODO: fetch top items

// export const fetchTopOrderItems = createAsyncThunk(
//   `restaurant/fetchTopOrderItems`,
//   async ({restaurantId}, thunkAPI) => {
//     try {
//       return await RestaurantApi.setFavorite(restaurantId, isFavorite);
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// )


export const restaurantSlice = createSlice({
  name: `restaurant`,
  initialState: {
    restaurant: {},
    isFetching: false,
    isError: false,
    isSuccess: false,
    isUpdating: false,
    updateSuccess: false,
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
      state.isOpen = checkRestaurantOpen(payload.restaurant?.openHours);
    },
    [setFavoriteRestaurant.pending]: (state) => {
      state.isUpdating = true;
      state.restaurant.isFavorite = !state.restaurant?.isFavorite;
    },
    [setFavoriteRestaurant.rejected]: (state, {payload}) => {
      state.isUpdating = false;
      state.isError = true;
      state.errorMessage = payload;
      state.restaurant.isFavorite = !state.restaurant?.isFavorite;
    },
    [setFavoriteRestaurant.fulfilled]: (state) => {
      state.isUpdating = false;
      state.updateSuccess = true;
    }
  },
});

export const {clearRestaurantState, setAbleToDelivery} = restaurantSlice.actions;
export const restaurantSelector = (state) => state.restaurant;