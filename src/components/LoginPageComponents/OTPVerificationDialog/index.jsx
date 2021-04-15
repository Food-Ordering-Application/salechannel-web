import React, {useState} from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import CustomerService from "../../../services/customerService";
import {showError, showSuccess} from "../../../redux/snackbar/snackbarSlice";

export default function OTPVerificationDialog({open, handleClose}) {
  const [otp, setOtp] = useState(``);
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.customer.accessToken);
  console.log(`Token ${token}`);

  const handleTextChange = (e) => {
    e.preventDefault();
    setOtp(`${e.target.value}`);
  }
  const handleSubmit = () => {
    CustomerService.submitOTP(otp, token)
      .then(() => {
        dispatch(showSuccess(`Xác thực tài khoản thành công`));
        handleClose();
        history.replace(`/`);
      })
      .catch(error => dispatch(showError(error)));
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Nhập mã OTP</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Vui lòng nhập mã OTP được gửi đến số điện thoại của bạn
        </DialogContentText>
        <TextField
          variant="outlined"
          autoFocus
          id="otp"
          label="OTP"
          type="text"
          onChange={handleTextChange}
          required
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Hủy</Button>
        <Button onClick={handleSubmit} color="primary">Gửi</Button>
      </DialogActions>
    </Dialog>
  )
}