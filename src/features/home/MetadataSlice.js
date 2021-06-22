import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {SystemApi} from "../../api/SystemApi";
import RestaurantApi from "../../api/RestaurantApi";

export const fetchMetadata = createAsyncThunk(
  `metadata/fetch`,
  async ({longitude, latitude}, thunkAPI) => {
    try {
      const _metadata = await SystemApi.fetchMetadata()
      const _nearby = await RestaurantApi.filter(1, 25, 5, undefined, '', undefined, 1, {longitude, latitude})
      return {..._metadata, ..._nearby}
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const metadataSlice = createSlice({
  name: 'metadata',
  initialState: {
    isFetching: false,
    isSuccess: false,
    isError: false,
    errorMessage: '',
    data: {}
  },
  reducers: {
    clearMetadataState: (state) => {
      state.isFetching = false
      state.isSuccess = false
      state.isError = false
      state.errorMessage = ''
    }
  },
  extraReducers: {
    [fetchMetadata.pending]: (state) => {
      state.isFetching = true
      state.isSuccess = false
      state.isError = false
    },
    [fetchMetadata.rejected]: (state, {payload}) => {
      state.isFetching = false
      state.isSuccess = false
      state.isError = true
      state.errorMessage = payload
    },
    [fetchMetadata.fulfilled]: (state, {payload}) => {
      state.isFetching = false
      state.isSuccess = true
      state.isError = false

      let _categories = {}
      for (let i = 0; i < payload.categories.length; i++) {
        const category = payload.categories[i]
        _categories[category.id] = category.name
      }

      state.data = {
        ...payload,
        _categories,
      }
    },
  }
})

export const {clearMetadataState} = metadataSlice.actions
export const metadataSelector = (state) => state.metadata