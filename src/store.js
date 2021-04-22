import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {snackbarSlice} from "./features/common/Snackbar/SnackbarSlice";
import {userSlice} from "./features/user/UserSlice";
import {otpSlice} from "./features/user/login-page/components/otpVerification-dialog/otpSlice";
import {persistReducer} from "redux-persist";
import {orderSlice} from "./features/order/OrderSlice";

const reducer = combineReducers({
  snackbar: snackbarSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
  otp: otpSlice.reducer,
});

const persistedReducer = persistReducer({
  key: `root`,
  storage,
  whitelist: [`user`,`order`],
}, reducer);

export default configureStore({
  reducer: persistedReducer,
});