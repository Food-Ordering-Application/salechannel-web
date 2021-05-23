import React, {useEffect, useState} from "react";
import {Box, Button, Grid, TextField, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useDispatch, useSelector} from "react-redux";
import {clearUserState, requestResettingPassword, userSelector} from "../UserSlice";
import {useHistory} from "react-router-dom";
import {showError, showSuccess} from "../../common/Snackbar/SnackbarSlice";
import {makeStyles} from "@material-ui/core/styles";
import {emailValidator} from "../../../untils/validator";

const useStyles = makeStyles((theme) => ({
    container: {
      width: `100vw`,
      height: `100vh`,
      backgroundColor: theme.palette.primary.l0,
    },
    label: {
      fontSize: `24px`,
      color: theme.palette.primary.main,
    },
    root: {
      boxShadow: theme.effect.dp10.boxShadow,
      borderRadius: theme.spacing(2),
      backgroundColor: theme.palette.surface.light,
    }
  })
);

export default function ResetPasswordRequest() {
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const {isFetching, isError, errorMessage, resetPassword: {isRequestSuccess}} = useSelector(userSelector);
  const handleSubmit = () => {
    try {
      emailValidator(email);
      dispatch(requestResettingPassword({email}));
    } catch (error) {
      dispatch(showError(error.message));
    }
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
    <Box>
      <TopNavigationBar label={"Khôi phục mật khẩu"}/>
      <Grid container alignItems="center" justify="center" className={classes.container}>
        <Grid item className={classes.root}>
          <Box px={2} py={6}>
            <Box pb={2}>
              <Typography variant="h3">
                <Box className={classes.label}>Email tài khoản của bạn</Box>
              </Typography>
            </Box>
            <TextField variant="outlined"
                       autoFocus
                       fullWidth
                       onFocus={e => e.target.select()}
                       type="email"
                       placeholder="Email"
                       value={email}
                       onChange={e => setEmail(`${e.target.value}`)}
            />
            <Box pt={4}>
              <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} disabled={isFetching}>
                Gửi yêu cầu
              </Button>
            </Box>
            <Box pt={2}>
              <Button variant="outlined" color="primary" fullWidth onClick={() => history.replace(`/login`)}>
                Về trang đăng nhập
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}