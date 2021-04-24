import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";

import {snackbarSlice} from "./features/common/Snackbar/SnackbarSlice";
import {userSlice} from "./features/user/UserSlice";
import {otpSlice} from "./features/user/login-page/components/otpVerification-dialog/otpSlice";
import {orderSlice} from "./features/order/OrderSlice";
import {restaurantsListSlice} from "./features/restaurant/RestaurantsListSlice";
import {restaurantSlice} from "./features/restaurant/RestaurantSlice";
import {menuSlice} from "./features/restaurant/MenuSlice";

const reducer = combineReducers({
  snackbar: snackbarSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
  otp: otpSlice.reducer,
  restaurant: restaurantSlice.reducer,
  restaurants: restaurantsListSlice.reducer,
  menu: menuSlice.reducer,
});

const persistedReducer = persistReducer({
  key: `root`,
  storage,
  whitelist: [`user`, `order`],
}, reducer);

export default configureStore({
  reducer: persistedReducer,
});