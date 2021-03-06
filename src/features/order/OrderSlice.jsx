import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {OrderApi} from "../../api/OrderApi";
import {paymentConstant} from "../../constants/paymentConstant";
import {DriverApi} from "../../api/RiderApi";

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
      // thunkAPI.dispatch(cacheOrderPending())
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
      const orderData = await OrderApi.fetchOrderData(orderId)
      const {order: {delivery}} = orderData
      if (delivery?.driverId) {
        const driverInfo = await DriverApi.getDriverInfo(delivery.driverId)
        return {order: {...orderData.order, ...driverInfo}}
      }
      return orderData
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
DEFAULT PROPS
 */

const defaultProps = {
  subTotal: 0,
  orderItems: [],
  note: '',
  paymentType: paymentConstant.COD.code
}

const initProps = {
  isRequesting: false,
  isError: false,
  isSuccess: false,
  isEmpty: true,
  isCreating: false,
  createSuccess: false,
  isUpdating: false,
  isPlacing: false,
  orderSuccess: false,
  data: {...defaultProps},
}

/*
REDUX SLICE
 */

export const orderSlice = createSlice({
    name: 'order',
    initialState: initProps,
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
      },
      clearOrder: (state) => {
        return initProps;
      },
      cacheOrderPending: (state, {payload}) => {

      },
      updateOrderStatus: (state, {payload}) => {
        state.data = Object.assign(state.data, payload);
      },
      updateDriverLocation: (state, {payload}) => {
        console.log(payload)
        state["driverGeom"] = {...payload}
      }
    },
    extraReducers: {
      [createOrder.pending]: (state, {meta: {arg: {restaurantId, menuItem, topping}}}) => {
        state.isCreating = true;
        state.isError = false;
        state.createSuccess = false;

        state.data[`restaurantId`] = restaurantId;

        const fTopping = topping.flat();
        let price = menuItem.price;
        for (let i = 0; i < topping.length; i++) {
          price += fTopping[i].price;
        }
        state.data[`subTotal`] = price * menuItem.quantity;

        state.data[`orderItems`] = [{
          menuItemId: menuItem?.id,
          quantity: menuItem?.quantity,
        }];

        state.isEmpty = false;
        return state;
      },
      [createOrder.rejected]: (state, {payload}) => {
        state.isCreating = false;
        state.isEmpty = true;
        state.isError = true;
        state.errorMessage = payload;
        state.data[`subTotal`] = 0;
        state.data[`orderItems`] = [];
      },
      [createOrder.fulfilled]: (state, {payload}) => {
        state.isCreating = false;
        state.createSuccess = true;
        state.isEmpty = !payload.order;
        state.data = {...defaultProps, ...payload.order};
      },
      [addItem.pending]: (state, {meta: {arg: {menuItem, topping}}}) => {
        handlePendingDefault(state);

        const fTopping = topping.flat();
        let price = menuItem.price;
        for (let i = 0; i < fTopping.length; i++) {
          price += fTopping[i].price;
        }
        state.data[`subTotal`] += price * menuItem.quantity;

        state.data[`orderItems`].push({
          menuItemId: menuItem.id,
          quantity: menuItem.quantity,
          orderItemToppings: topping.map(({id}) => ({
            menuItemToppingId: id,
            quantity: 1,
          })),
        });

      },
      //TODO: handle add item rejected
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
      [confirmOrder.pending]: (state) => {
        state.isPlacing = true;
      },
      [confirmOrder.rejected]: (state, {payload}) => {
        state.isPlacing = false;
        state.isError = true;
        state.errorMessage = payload;
      },
      [confirmOrder.fulfilled]: (state, {payload}) => {
        state.isPlacing = false;
        state.orderSuccess = state.data.paymentType !== paymentConstant.PAYPAL.code;
        state.data = {...state.data, orderUrl: payload?.orderUrl}
      },
      [approvePaypal.pending]: (state) => {
        state.isPlacing = true;
      },
      [approvePaypal.rejected]: (state, {payload}) => {
        state.isPlacing = false;
        state.isError = true;
        state.errorMessage = payload;
      },
      [approvePaypal.fulfilled]: (state, {payload}) => {
        state.isPlacing = false;
        state.orderSuccess = true;
      },
      [fetchOrderData.pending]: handlePendingDefault,
      [fetchOrderData.rejected]: handleRejectDefault,
      [fetchOrderData.fulfilled]: (state, {payload}) => {
        state.isRequesting = false;
        state.isSuccess = true;
        state.isEmpty = !payload.order;
        state.data = Object.assign({
          note: '',
          paymentType: payload.order?.invoice?.payment?.method || paymentConstant.COD.code
        }, payload.order)
      },
    },
  })
;

export const {
  clearOrderState,
  setPaymentType,
  setNote,
  clearOrder,
  cacheOrderPending,
  updateOrderStatus,
  updateDriverLocation,
} = orderSlice.actions;
export const orderSelector = (state) => state.order;