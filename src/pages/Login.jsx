import React, {useState} from "react";
import {Box, Button, Grid, IconButton, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import StyledLink from "../components/StyledLink";
import {ChevronLeft} from "@material-ui/icons";
import OTPVerificationDialog from "../components/LoginPageComponents/OTPVerificationDialog";
import CustomerService from "../services/customerService";
import {useDispatch} from "react-redux";
import {showError, showSuccess} from "../redux/snackbar/snackbarSlice";
import {setCustomer} from "../redux/customer/customerSlice";

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(``);
  const [password, setPassword] = useState(``);
  const [open, setOpen] = useState(false);

  const handleNameChange = (e) => {
    setPhoneNumber(`${e.target.value}`);
  }
  const handlePasswordChange = (e) => {
    setPassword(`${e.target.value}`);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    CustomerService.login(phoneNumber, password)
      .then((data) => {
        console.log(data);
        dispatch(setCustomer(data));
        if (!data.user.isPhoneNumberVerified) {
          CustomerService.requestOTP(data.access_token)
            .then(() => setOpen(true))
            .catch(error => dispatch(showError(error)));
        } else {
          dispatch(showSuccess(`Đăng nhập thành công`));
          history.replace("/");
        }
      })
      .catch(error => dispatch(showError(error)));
  }

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
          <Typography variant="subtitle2" color="inherit">
            <Box>Vui lòng điền tên tài khoản và mật khẩu</Box>
          </Typography>
        </Grid>
      </Grid>
      <form noValidate className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Tên tài khoản"
          name="username"
          autoComplete="username"
          autoFocus
          value={phoneNumber}
          onChange={handleNameChange}
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
          onChange={handlePasswordChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Đăng nhập
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
              <Box fontSize={14} pt={5}>Chưa có tài khoản? <StyledLink to="/register">Đăng ký</StyledLink></Box>
            </Typography>
          </Grid>
        </Grid>
      </form>
      <OTPVerificationDialog open={open} handleClose={() => setOpen(!open)}/>
    </Box>
  );
}