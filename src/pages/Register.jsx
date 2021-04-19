import React, {useState} from "react";
import {Box, Button, Grid, IconButton, makeStyles, TextField, Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import StyledLink from "../components/StyledLink";
import {ChevronLeft} from "@material-ui/icons";
import CustomerService from "../services/customerService"
import {useDispatch} from "react-redux";
import {showError, showSuccess} from "../features/common/Snackbar/SnackbarSlice";

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
    margin: theme.spacing(2, 0, 2),
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    color: theme.palette.surface.light,
  }
}));

export default function Register() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(``);
  const [password1, setPassword1] = useState(``);
  const [password2, setPassword2] = useState(``);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(`${e.target.value}`);
  }
  const handlePasswordChange1 = (e) => {
    setPassword1(`${e.target.value}`);
  }
  const handlePasswordChange2 = (e) => {
    setPassword2(`${e.target.value}`);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    CustomerService.register(phoneNumber, password1)
      .then(() => {
        dispatch(showSuccess(`Tạo tài khoản thành công`));
        history.replace(`/login`);
      })
      .catch(error => {
        dispatch(showError(error));
      });
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
            <Box fontSize={40}>Đăng ký</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="inherit">
            <Box>Vui lòng nhập số điện thoại và mật khẩu</Box>
          </Typography>
        </Grid>
      </Grid>
      <form noValidate className={classes.form}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="phoneNumber"
          label="Số điện thoại"
          name="phoneNumber"
          autoComplete="phoneNumber"
          autoFocus
          type="tel"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password1"
          label="Mật khẩu"
          type="password"
          id="password1"
          autoComplete="current-password"
          onChange={handlePasswordChange1}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Nhập lại mật khẩu"
          type="password"
          id="password2"
          autoComplete="current-password"
          onChange={handlePasswordChange2}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmit}
        >
          Đăng ký ngay
        </Button>
        <Grid container justify="center">
          <Grid item>
            <Typography variant="subtitle1" color="inherit">
              <Box fontSize={14} pt={3}>Đã có tài khoản? <StyledLink to="/login">Đăng nhập</StyledLink></Box>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}