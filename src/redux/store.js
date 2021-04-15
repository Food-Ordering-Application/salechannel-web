import {configureStore} from "@reduxjs/toolkit";
import snackbarReducer from "./snackbar/snackbarSlice";

export default configureStore({
  reducer: {
    snackbar: snackbarReducer
  },
});