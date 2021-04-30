import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Divider, Grid, Typography} from "@material-ui/core";
import {ExpandLess, PaymentOutlined} from "@material-ui/icons";
import {currencyFormatter} from "../../../../../untils/formatter";


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.surface.light,
  },
  label: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.mediumEmphasis,
  },
  cost: {
    fontSize: theme.spacing(2),
    color: theme.palette.onSurface.highEmphasis,
  },
  orderBtn: {
    fontSize: theme.spacing(2),
    color: theme.palette.surface.light,
  },
  couponBtn: {
    fontSize: theme.spacing(2),
  },
  paymentBtn: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.highEmphasis,
  }
}));

export default function MainActionsBottom({totalCost, handleCheckout, handleAddPromo, handlePaymentChange}) {
  const classes = useStyles();

  return (
    <Box p={2} className={classes.root}>
      <Box my={2}>
        <Grid container>
          <Grid item xs>
            <Button variant="text" fullWidth>
              <Grid container alignItems="center">
                <Grid item>
                  <PaymentOutlined/>
                </Grid>
                <Grid item xs>
                  <Typography variant="h5">
                    <Box className={classes.paymentBtn}>ATM</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <ExpandLess/>
                </Grid>
              </Grid>
            </Button>
          </Grid>
          <Grid item>
            <Divider orientation="vertical"/>
          </Grid>
          <Grid item xs>
            <Button variant="text" color="primary" fullWidth className={classes.couponBtn}>
              Chọn Coupon
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h5">
              <Box className={classes.label}>Tổng cộng</Box>
            </Typography>
            <Typography variant="h4">
              <Box className={classes.cost}>{currencyFormatter(totalCost)}</Box>
            </Typography>
          </Grid>
          <Grid item xs>
            <Button variant="contained" color="primary" fullWidth onClick={handleCheckout}>
              <Box className={classes.orderBtn}>Đặt hàng</Box>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}