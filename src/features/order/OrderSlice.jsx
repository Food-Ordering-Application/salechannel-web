import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OrderApi} from "../../api/OrderApi";

export const createOrder = createAsyncThunk(
  `order/create`,
  async ({restaurantId, userId, menuItem, topping}, thunkAPI) => {
    try {
      return await OrderApi.createOrder(restaurantId, userId, menuItem, topping);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const addItem = createAsyncThunk(
  `order/addItem`,
  async ({orderId, menuItem, topping}, thunkAPI) => {
    try {
      return await OrderApi.addItem(orderId, menuItem, topping);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const fetchOrder = createAsyncThunk(
  `order/getAssociated`,
  async ({restaurantId, customerId}, thunkAPI) => {
    try {
      return await OrderApi.getOrderAssociated(restaurantId, customerId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const increaseQuantity = createAsyncThunk(
  `order/increaseQuantity`,
  async ({orderId, orderItemId}, thunkAPI) => {
    try {
      return await OrderApi.increaseQuantity(orderId, orderItemId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const decreaseQuantity = createAsyncThunk(
  `order/increaseQuantity`,
  async ({orderId, orderItemId}, thunkAPI) => {
    try {
      return await OrderApi.decreaseQuantity(orderId, orderItemId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const removeItem = createAsyncThunk(
  `order/removeItem`,
  async ({orderId, orderItemId}, thunkAPI) => {
    try {
      return await OrderApi.removeItem(orderId, orderItemId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const handlePendingDefault = (state) => {
  state.isRequesting = true;
};

const handleRejectDefault = (state, {payload}) => {
  state.isRequesting = false;
  state.isError = true;
  state.errorMessage = payload;
};

const handleFulfillDefault = (state, {payload}) => {
  state.isRequesting = false;
  state.isSuccess = true;
  state.isEmpty = !payload.order;
  state.data = payload.order;
};

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isRequesting: false,
    isError: false,
    isSuccess: false,
    isEmpty: true,
    data: {},
  },
  reducers: {
    clearOrderState: (state) => {
      state.isRequesting = false;
      state.isError = false;
      state.isSuccess = false;
      return state;
    },
  },
  extraReducers: {
    [createOrder.fulfilled]: (state, {payload}) => {
      state.isRequesting = false;
      state.isSuccess = true;
      state.isEmpty = false;
      state.data = payload;
    },
    [createOrder.pending]: (state) => {
      state.isRequesting = true;
    },
    [createOrder.rejected]: (state, {payload}) => {
      state.isRequesting = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [addItem.pending]: (state) => {
      state.isRequesting = true;
    },
    [addItem.rejected]: (state, {payload}) => {
      state.isRequesting = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [addItem.fulfilled]: (state, {payload}) => {
      state.isRequesting = false;
      state.isSuccess = true;
      state.isEmpty = false;
      state.data = payload.order;
    },
    [fetchOrder.pending]: (state) => {
      state.isRequesting = true;
    },
    [fetchOrder.rejected]: (state, {payload}) => {
      state.isRequesting = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [fetchOrder.fulfilled]: (state, {payload}) => {
      state.isRequesting = false;
      state.isSuccess = true;
      state.isEmpty = payload.order === undefined;
      state.data = payload.order;
    },
    [increaseQuantity.pending]: handlePendingDefault,
    [increaseQuantity.rejected]: handleRejectDefault,
    [increaseQuantity.fulfilled]: handleFulfillDefault,
    [decreaseQuantity.pending]: handlePendingDefault,
    [decreaseQuantity.rejected]: handleRejectDefault,
    [decreaseQuantity.fulfilled]: handleFulfillDefault,
    [removeItem.pending]: handlePendingDefault,
    [removeItem.rejected]: handleRejectDefault,
    [removeItem.fulfilled]: handleFulfillDefault,
  },
});

export const {clearOrderState} = orderSlice.actions;
export const orderSelector = (state) => state.order;