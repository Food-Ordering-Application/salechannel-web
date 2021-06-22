import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getAddressV2, getCurrentLocation} from "../../helpers/location";

export const analyseCurrentLocation = createAsyncThunk(
  `location/analyse`,
  async ({}, thunkAPI) => {
    try {
      const {coords: {latitude, longitude}} = await getCurrentLocation()
      return ({
        location: {longitude, latitude},
        address: await getAddressV2(longitude, latitude)
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message)
    }
  }
)

export const locationSlice = createSlice({
  name: `location`,
  initialState: {
    isPending: false,
    isSuccess: false,
    isError: false,
    errorMessage: ``,
    location: {
      longitude: null,
      latitude: null,
    },
    address: ``,
  },
  reducers: {
    clearLocationState: (state) => {
      state.isPending = false;
      state.isError = false;
      state.isSuccess = false;
    }
  },
  extraReducers: {
    [analyseCurrentLocation.pending]: (state) => {
      state.isPending = true;
    },
    [analyseCurrentLocation.rejected]: (state, {payload}) => {
      state.isPending = false;
      // state.isError = true;
      state.isSuccess = true;
      state.errorMessage = payload;
    },
    [analyseCurrentLocation.fulfilled]: (state, {payload}) => {
      state.isPending = false;
      state.isSuccess = true;
      state.location = payload.location;
      state.address = payload.address;
    }
  }
})

export const {clearLocationState} = locationSlice.actions;
export const locationSelector = (state) => state.location;