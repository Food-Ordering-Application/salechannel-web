import React, {useEffect, useState} from "react";
import {Box, Button, Grid, TextField} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {clearUserState, submitNewPassword, userSelector, verifyResettingPassword} from "../UserSlice";
import {useHistory, useParams} from "react-router-dom";
import {showError, showSuccess} from "../../common/Snackbar/SnackbarSlice";
import {passwordValidator} from "../register-page/Register";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: `100vw`,
    height: `100vh`,
  }
}));

const titleText = {
  verifying: `Đang kiểm tra yêu cầu`,
  verifySuccess: `Nhập mật khẩu mới`
};

export default function ResetPasswordVerify() {
  const history = useHistory();
  const {code: resetToken} = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [title, setTitle] = useState(titleText.verifying);
  const [password1, setPassword1] = useState(``);
  const [password2, setPassword2] = useState(``);
  const {
    isFetching,
    isError,
    id: customerId,
    errorMessage,
    resetPassword: {
      isVerifySuccess,
      isResetSuccess
    }
  } = useSelector(userSelector);


  const handleSubmit = () => {
    try {
      passwordValidator(password1, password2);
      dispatch(submitNewPassword({customerId: customerId, password: password1, resetToken: resetToken}));
    } catch (error) {
      dispatch(showError(error.message));
    }
  }

  useEffect(() => {
    if (resetToken && resetToken.length > 0) {
      dispatch(verifyResettingPassword({resetToken}));
    } else {
      history.replace(`/reset-password`);
    }
  }, [resetToken]);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearUserState());
      if (!isVerifySuccess)
        history.replace(`/reset-password`);
    }
    if (isVerifySuccess) {
      setTitle(titleText.verifySuccess);
    }
    if (isResetSuccess) {
      dispatch(showSuccess(`Đổi mật khẩu thành công`));
      history.replace(`/login`);
    }
  }, [isError, isVerifySuccess, isResetSuccess]);

  return (
    <>
      <TopNavigationBar label={title}/>
      <Grid container justify="center" alignItems="center" className={classes.container}>
        <Grid item>
          <TextField variant="outlined"
                     autoFocus
                     fullWidth
                     onFocus={e => e.target.select()}
                     type="password"
                     placeholder="Mật khẩu mới"
                     value={password1}
                     onChange={e => setPassword1(`${e.target.value}`)}
          />
          <TextField variant="outlined"
                     autoFocus
                     fullWidth
                     onFocus={e => e.target.select()}
                     type="password"
                     placeholder="Nhập lại mật khẩu mới"
                     value={password2}
                     onChange={e => setPassword2(`${e.target.value}`)}
          />
          <Box pt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={isFetching}>
              Gửi yêu cầu
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box p={2}>
        <Box hidden={!isFetching}>
          Đang kiểm tra yêu cầu
        </Box>
        <Box hidden={!isVerifySuccess}>
          <TextField variant="outlined"
                     autoFocus
                     fullWidth
                     onFocus={e => e.target.select()}
                     type="password"
                     placeholder="Mật khẩu mới"
                     value={password1}
                     onChange={e => setPassword1(`${e.target.value}`)}
          />
          <TextField variant="outlined"
                     autoFocus
                     fullWidth
                     onFocus={e => e.target.select()}
                     type="password"
                     placeholder="Nhập lại mật khẩu mới"
                     value={password2}
                     onChange={e => setPassword2(`${e.target.value}`)}
          />
          <Box pt={2}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={isFetching}>
              Gửi yêu cầu
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}