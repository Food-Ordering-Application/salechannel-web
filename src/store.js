import {combineReducers, configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist";

import {snackbarSlice} from "./features/common/Snackbar/SnackbarSlice";
import {userSlice} from "./features/user/UserSlice";
import {otpSlice} from "./features/user/login-page/components/otpVerification-dialog/otpSlice";
import {orderSlice} from "./features/order/OrderSlice";
import {restaurantFavoriteSlice} from "./features/restaurant/RestaurantFavoriteSlice";
import {restaurantsListSlice} from "./features/restaurant/RestaurantsListSlice";
import {restaurantSlice} from "./features/restaurant/RestaurantSlice";
import {menuSlice} from "./features/restaurant/MenuSlice";
import {addressSlice} from "./features/address/AddressSlice";
import {locationSlice} from "./features/home/LocationSlice";
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from "redux-persist/es/constants";

const reducer = combineReducers({
  snackbar: snackbarSlice.reducer,
  user: userSlice.reducer,
  order: orderSlice.reducer,
  otp: otpSlice.reducer,
  restaurant: restaurantSlice.reducer,
  restaurants: restaurantsListSlice.reducer,
  favoriteRestaurants: restaurantFavoriteSlice.reducer,
  menu: menuSlice.reducer,
  address: addressSlice.reducer,
  location: locationSlice.reducer,
});

const persistedReducer = persistReducer({
  key: `root`,
  storage,
  whitelist: [`user`],
  timeout: 500,
}, reducer);

export default configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});