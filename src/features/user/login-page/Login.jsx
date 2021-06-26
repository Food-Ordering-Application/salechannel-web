import React, {useEffect, useState} from "react";
import {Box, Button, CircularProgress, Grid, IconButton, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory, useLocation} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {ChevronLeft} from "@material-ui/icons";

import StyledLink from "../../../components/StyledLink";
import OTPVerificationDialog from "./components/otpVerification-dialog/OTPVerificationDialog";
import {clearUserState, loginUser, userSelector} from "../UserSlice";
import {showError, showInfo} from "../../common/Snackbar/SnackbarSlice";
import {otpSelector, requestOTP} from "./components/otpVerification-dialog/otpSlice";
import firebase from "../../../helpers/firebase";
import {clearLocationState} from "../../home/LocationSlice";
import {clearMetadataState} from "../../home/MetadataSlice";


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  back: {
    position: `absolute`,
    top: 0,
    left: 0,
    color: theme.palette.surface.light,
  },
  label: {
    height: `35vh`,
    background: `linear-gradient(45deg,${theme.palette.primary.main},${theme.palette.primary.l2})`,
    color: theme.palette.surface.light,
    borderRadius: theme.spacing(0, 0, 8, 0),
    padding: theme.spacing(2),
  },
  form: {
    padding: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    color: theme.palette.surface.light,
  }
}));

export default function Login() {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(``);
  const [password, setPassword] = useState(``);
  const {isFetching, isSuccess, isError, errorMessage, isPhoneNumberVerified} = useSelector(userSelector);
  const {isRequesting} = useSelector(otpSelector);
  const {isRequesting: otpRequesting, isVerifySuccess} = useSelector(otpSelector);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({phoneNumber, password}));
  }

  useEffect(() => {
    return () => {
      dispatch(clearUserState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearUserState());
    }
    if (isSuccess) {
      dispatch(clearUserState());
      if (!isPhoneNumberVerified) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha', {
          'size': 'invisible',
          'callback': (recaptchaToken) => {
            dispatch(requestOTP({phoneNumber: `+84${phoneNumber.substring(1)}`, recaptchaToken}));
          }
        }).verify();
      } else {
        dispatch(showInfo(`Đăng nhập thành công`));
        if (!location.state?.ref) {
          dispatch(clearLocationState())
          dispatch(clearMetadataState())
        }
        history.replace(location.state?.ref || '/');
      }
    }
    if (isVerifySuccess) {
      dispatch(showInfo(`Đăng nhập thành công`));
      if (!location.state?.ref) {
        dispatch(clearLocationState())
        dispatch(clearMetadataState())
      }
      history.replace(location.state?.ref || '/');
    }
  }, [isError, isSuccess, isVerifySuccess])

  return (
    <Box className={classes.root}>
      <Box className={classes.back}>
        <IconButton color="inherit" onClick={() => history.goBack()}>
          <ChevronLeft/>
        </IconButton>
      </Box>
      <Grid container direction="column" justify="flex-end" className={classes.label}>
        <Grid item>
          <Typography variant="h2" color="inherit">
            <Box fontSize={40}>Đăng nhập</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h5" color="inherit">
            <Box fontSize={12} mt={1}>Vui lòng điền tên tài khoản và mật khẩu</Box>
          </Typography>
        </Grid>
      </Grid>
      <form noValidate className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phonenumber"
          label="Số điện thoại"
          name="phonenumber"
          autoComplete="phonenumber"
          autoFocus
          value={phoneNumber}
          onChange={
            (event) =>
              setPhoneNumber(`${event.target.value}`)
          }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Mật khẩu"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={
            (event) =>
              setPassword(`${event.target.value}`)
          }
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
          disabled={isFetching || isRequesting || otpRequesting}
        >
          {isFetching || isRequesting || otpRequesting ? <CircularProgress size={26}/> : `Đăng nhập`}
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Typography variant="subtitle1" color="inherit">
              <Box fontSize={14}>
                <StyledLink to="/reset-password">Quên mật khẩu</StyledLink>
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="subtitle1" color="inherit">
              <Box fontSize={14} pt={8}>Chưa có tài khoản? <StyledLink to="/register">Đăng ký</StyledLink></Box>
            </Typography>
          </Grid>
        </Grid>
        <div id="recaptcha"/>
      </form>
      <OTPVerificationDialog/>
    </Box>
  );
}