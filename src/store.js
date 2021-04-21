import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {snackbarSlice} from "./features/common/Snackbar/SnackbarSlice";
import customerReducer from "./redux/customer/customerSlice";
import {userSlice} from "./features/user/UserSlice";
import {otpSlice} from "./features/user/login-page/components/otpVerification-dialog/otpSlice";
import {persistReducer} from "redux-persist";

const reducer = combineReducers({
  snackbar: snackbarSlice.reducer,
  customer: customerReducer,
  user: userSlice.reducer,
  otp: otpSlice.reducer,
});

const persistedReducer = persistReducer({
  key: `root`,
  storage,
  whitelist: [`user`],
}, reducer);

export default configureStore({
  reducer: persistedReducer,
});