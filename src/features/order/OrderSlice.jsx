import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OrderApi} from "../../api/OrderApi";
import {paymentConstant} from "../../constants/paymentConstant";

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
  state.data = Object.assign({note: '', paymentType: paymentConstant.COD.code}, payload.order);
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

export const fetchOrderData = createAsyncThunk(
  `order/fetch`,
  async ({orderId}, thunkAPI) => {
    try {
      return await OrderApi.fetchOrderData(orderId);
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
  `order/decreaseQuantity`,
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
  async ({orderId, note, paymentType}, thunkAPI) => {
    try {
      return await OrderApi.confirmOrder(orderId, note, paymentType);
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const approvePaypal = createAsyncThunk(
  `order/approvePaypal`,
  async ({orderId, paypalOrderId}, thunkAPI) => {
    try {
      return await OrderApi.approvePaypal(orderId, paypalOrderId);
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
      data: {
        note: '',
        paymentType: paymentConstant.COD.code
      },
      orderSuccess: false,
    },
    reducers: {
      clearOrderState: (state) => {
        state.isRequesting = false;
        state.isError = false;
        state.isSuccess = false;
        state.orderSuccess = false;
        return state;
      },
      setPaymentType: (state, {payload: paymentType}) => {
        state.data = {...(state.data), paymentType};
      },
      setNote: (state, {payload: note}) => {
        state.data.note = note;
      }
    },
    extraReducers: {
      [createOrder.fulfilled]: handleFulfillDefault,
      [createOrder.pending]: handlePendingDefault,
      [createOrder.rejected]: handleRejectDefault,
      [addItem.pending]: handlePendingDefault,
      [addItem.rejected]: handleRejectDefault,
      [addItem.fulfilled]: handleFulfillDefault,
      [fetchOrder.pending]: handlePendingDefault,
      [fetchOrder.rejected]: handleRejectDefault,
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
        state.orderSuccess = state.data.paymentType === paymentConstant.COD.code;
      },
      [approvePaypal.pending]: handlePendingDefault,
      [approvePaypal.rejected]: handleRejectDefault,
      [approvePaypal.fulfilled]: (state, {payload}) => {
        console.log(`Approve paypal: ` + payload);
        state.isRequesting = false;
        state.isSuccess = true;
        state.orderSuccess = true;
      },
      [fetchOrderData.pending]: handlePendingDefault,
      [fetchOrderData.rejected]: handleRejectDefault,
      [fetchOrderData.fulfilled]: handleFulfillDefault,
    },
  })
;

export const {clearOrderState, setPaymentType, setNote} = orderSlice.actions;
export const orderSelector = (state) => state.order;