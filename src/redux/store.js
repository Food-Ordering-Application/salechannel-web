import {configureStore} from "@reduxjs/toolkit";
import snackbarReducer from "./snackbar/snackbarSlice";
import customerReducer from "./customer/customerSlice";

export default configureStore({
  reducer: {
    snackbar: snackbarReducer,
    customer: customerReducer,
  },
});