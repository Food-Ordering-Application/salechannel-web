import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import RestaurantApi from "../../api/RestaurantApi";

const ROW_PER_PAGE = 25

export const filterRestaurant = createAsyncThunk(
  `restaurants/filter`,
  async ({
           pageIndex,
           rowsPerPage = 25,
           area,
           category,
           name,
           append = false,
           categoryIds,
           filterIds,
           sortId,
           areaIds,
           cityId = 5,
           position
         }, thunkAPI) => {
    try {
      const data = await RestaurantApi.filter(pageIndex, rowsPerPage, area, category, name, categoryIds, sortId, position, filterIds, areaIds, cityId)
      return {...data, append}
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
);

export const restaurantsListSlice = createSlice({
  name: `restaurants`,
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    position: {
      latitude: null,
      longitude: null,
    },
    data: [],
    sortId: null,
    filterIds: [],
    areaIds: [],
    categoryIds: [],
  },
  reducers: {
    clearRestaurantsListState: (state) => {
      state.isFetching = false;
      state.isSuccess = false;
      state.isError = false;
      return state;
    },
    setCategoryIds: (state, {payload}) => {
      state.categoryIds = [...payload]
    },
    setAreaIds: (state, {payload}) => {
      state.areaIds = [...payload]
    },
    setFilterIds: (state, {payload}) => {
      state.filterIds = [...payload]
    },
    changeSort: (state, {payload: {id}}) => {
      state.sortId = id
    },
    clearAllFilter: (state) => {
      state.categoryIds = []
      state.areaIds = []
      state.filterIds = []
      state.sortId = null
      return state
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
    [filterRestaurant.fulfilled]: (state, {meta: {arg}, payload}) => {
      state.isFetching = false;
      state.isSuccess = true;
      if (arg?.append) {
        state.data = [...(state.data), ...(payload.restaurants)];
      } else {
        state.data = payload.restaurants;
      }
    }
  },
});

export const {
  clearRestaurantsListState,
  setCategoryIds,
  setAreaIds,
  setFilterIds,
  changeSort,
  clearAllFilter
} = restaurantsListSlice.actions;
export const restaurantsListSelector = (state) => state.restaurants;