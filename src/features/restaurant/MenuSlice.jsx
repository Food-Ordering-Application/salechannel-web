import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {MenuApi} from "../../api/MenuApi";

export const fetchMenu = createAsyncThunk(
  `restaurant/fetchMenu`,
  async ({id}, thunkAPI) => {
    try {
      return MenuApi.fetchMenu(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const menuSlice = createSlice({
  name: `menu`,
  initialState: {
    menu: null,
    isFetching: false,
    isError: false,
    isSuccess: false,
    errorMessage: ``,
  },
  reducers: {
    clearMenuState: (state) => {
      state.isFetching = false;
      state.isError = false;
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [fetchMenu.pending]: (state) => {
      state.isFetching = true;
    },
    [fetchMenu.rejected]: (state, {payload}) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload;
    },
    [fetchMenu.fulfilled]: (state, {payload}) => {
      state.isFetching = false;
      state.isSuccess = true;
      state.menu = payload.menuGroups;
    }
  },
});

export const {clearMenuState} = menuSlice.actions;
export const menuSelector = (state) => state.menu;