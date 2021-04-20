import {configureStore} from "@reduxjs/toolkit";
import {snackbarSlice} from "./features/common/Snackbar/SnackbarSlice";
import customerReducer from "./redux/customer/customerSlice";
import {userSlice} from "./features/user/UserSlice";
import {otpSlice} from "./features/user/login-page/components/otpVerification-dialog/otpSlice";

export default configureStore({
  reducer: {
    snackbar: snackbarSlice.reducer,
    customer: customerReducer,
    user: userSlice.reducer,
    otp: otpSlice.reducer,
  },
});