import React, {useEffect, useState} from "react";
import {Box, Button, TextField} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {clearUserState, requestResettingPassword, userSelector} from "../UserSlice";
import {useHistory} from "react-router-dom";
import {showError, showSuccess} from "../../common/Snackbar/SnackbarSlice";

export default function ResetPasswordRequest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState();
  const {isFetching, isError, errorMessage, resetPassword: {isRequestSuccess}} = useSelector(userSelector);
  const handleSubmit = () => {
    dispatch(requestResettingPassword({email}));
  };

  useEffect(() => {
    if (isRequestSuccess) {
      dispatch(clearUserState());
      dispatch(showSuccess(`Gửi yêu cầu khôi phục mật khẩu thành công.`));
      history.replace("/login");
    }
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearUserState());
    }
  }, [isError, isRequestSuccess]);

  return (
    <Box mt={6}>
      <TopNavigationBar label={"Khôi phục mật khẩu"}/>
      <Box p={2}>
        <TextField variant="outlined"
                   autoFocus
                   fullWidth
                   onFocus={e => e.target.select()}
                   type="email"
                   placeholder="Email"
                   value={email}
                   onChange={e => setEmail(`${e.target.value}`)}
        />
        <Box pt={2}>
          <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={isFetching}>
            Gửi yêu cầu
          </Button>
        </Box>
      </Box>
    </Box>
  );
}