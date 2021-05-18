import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OrderApi} from "../../api/OrderApi";

/*
DEFAULT HANDLERS
 */

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
  state.data = Object.assign({paymentType: `COD`}, payload.order);
};

/*
REDUX THUNK
 */

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

export const updateAddress = createAsyncThunk(
  `order/updateAddress`,
  async ({customerId, orderId, customerAddressId}, thunkAPI) => {
    try {
      return await OrderApi.updateAddress(customerId, orderId, customerAddressId);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const confirmOrder = createAsyncThunk(
  `order/confirmOrder`,
  async ({ orderId, note, paymentType}, thunkAPI) => {
    try {
      return await OrderApi.confirmOrder(orderId, note, paymentType);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

/*
REDUX SLICE
 */

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isRequesting: false,
    isError: false,
    isSuccess: false,
    isEmpty: true,
    data: {},
    orderSuccess: false,
  },
  reducers: {
    clearOrderState: (state) => {
      state.isRequesting = false;
      state.isError = false;
      state.isSuccess = false;
      return state;
    },
    setPaymentType: (state, {payload: paymentType}) => {
      state.data = {...(state.data), paymentType};
    }
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
      state.errorMessage = payload;
    },
    [addItem.pending]: (state) => {
      state.isRequesting = true;
    },
    [addItem.rejected]: (state, {payload}) => {
      state.isRequesting = false;
      state.isError = true;
      state.errorMessage = payload;
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
      state.errorMessage = payload;
    },
    [fetchOrder.fulfilled]: handleFulfillDefault,
    [increaseQuantity.pending]: handlePendingDefault,
    [increaseQuantity.rejected]: handleRejectDefault,
    [increaseQuantity.fulfilled]: handleFulfillDefault,
    [decreaseQuantity.pending]: handlePendingDefault,
    [decreaseQuantity.rejected]: handleRejectDefault,
    [decreaseQuantity.fulfilled]: handleFulfillDefault,
    [removeItem.pending]: handlePendingDefault,
    [removeItem.rejected]: handleRejectDefault,
    [removeItem.fulfilled]: handleFulfillDefault,
    [updateAddress.pending]: handlePendingDefault,
    [updateAddress.rejected]: handleRejectDefault,
    [updateAddress.fulfilled]: (state, {payload: {order}}) => {
      state.isRequesting = false;
      state.isSuccess = true;
      state.data = {...state.data, ...order};
    },
    [confirmOrder.pending]: handlePendingDefault,
    [confirmOrder.rejected]: handleRejectDefault,
    [confirmOrder.fulfilled]: (state) => {
      state.isRequesting = false;
      state.isSuccess = true;
      state.orderSuccess = true;
    }
  },
});

export const {clearOrderState, setPaymentType} = orderSlice.actions;
export const orderSelector = (state) => state.order;