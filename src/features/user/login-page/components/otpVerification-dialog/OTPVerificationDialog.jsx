import React, {useEffect, useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  TextField
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {showError, showSuccess} from "../../../../common/Snackbar/SnackbarSlice";
import {userSelector, verifyOtpSuccess} from "../../../UserSlice";
import {clearOtpState, closeOtpDialog, otpSelector, submitOtp} from "./otpSlice";

export default function OTPVerificationDialog() {
  const [otp, setOtp] = useState(``);
  const history = useHistory();
  const dispatch = useDispatch();
  const {accessToken} = useSelector(userSelector);
  const {
    isDialogOpen,
    isRequestError,
    isVerifying,
    isVerifyError,
    isVerifySuccess,
    errorMessage
  } = useSelector(otpSelector);

  useEffect(() => {
    if (isRequestError || isVerifyError) {
      dispatch(showError(errorMessage));
    }
    if (isVerifySuccess) {
      dispatch(verifyOtpSuccess());
      dispatch(showSuccess(`Xác thực thành công`));
      history.replace('/');
    }
    dispatch(clearOtpState());
  }, [isRequestError, isVerifyError, isVerifySuccess])

  const handleSubmit = () => {
    dispatch(submitOtp({otp: otp, token: accessToken}));
  };

  const handleClose = () => {
    setOtp(``);
    dispatch(closeOtpDialog());
  }

  return (
    <Dialog open={isDialogOpen} onClose={handleClose}>
      <DialogTitle>Nhập mã OTP</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng nhập mã xác nhận được gửi đến số điện thoại của bạn
        </DialogContentText>
        <TextField
          variant="outlined"
          autoFocus
          id="otp"
          label="Mã xác nhận"
          type="text"
          onChange={(event) => setOtp(`${event.target.value}`)}
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Hủy</Button>
        <Button onClick={handleSubmit} color="primary" disabled={isVerifying}>Gửi</Button>
      </DialogActions>
      <LinearProgress hidden={!isVerifying}/>
    </Dialog>
  )
}