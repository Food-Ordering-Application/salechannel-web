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

const defaultState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  errorMessage: ``,
  location: {
    longitude: null,
    latitude: null,
  },
  address: `Nhập địa chỉ giao hàng`,
}

export const locationSlice = createSlice({
  name: `location`,
  initialState: defaultState,
  reducers: {
    clearLocationState: (state) => {
      state.isPending = false;
      state.isError = false;
      state.isSuccess = false;
    },
    setDefaultLocation: (state, {payload}) => {
      state.location.longitude = payload.location.longitude || state.location.longitude;
      state.location.latitude = payload.location.latitude || state.location.latitude;
      state.address = payload.address || state.address;
    },
    clearDefaultLocationData: (state) => {
      return defaultState
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

export const {clearLocationState, setDefaultLocation, clearDefaultLocationData} = locationSlice.actions;
export const locationSelector = (state) => state.location;