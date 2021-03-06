import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Button, Grid, Typography} from '@material-ui/core';
import {ExpandLess} from '@material-ui/icons';
import {currencyFormatter} from '../../../../../untils/formatter';
import {useSelector} from "react-redux";
import {orderSelector} from "../../../OrderSlice";
import {paymentConstant} from "../../../../../constants/paymentConstant";
import {mapPaymentIcon} from "../PaymentDialog";
import PayPalButtonComponent from "../PayPalButton";

const useStyles = makeStyles((theme) => ({
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
  },
}));

export default function MainActionsBottom({
                                            totalCost,
                                            handleCheckout,
                                            handleAddPromo,
                                            handlePaymentChange,
                                            disablePlaceOrder,
                                          }) {
  const classes = useStyles();
  const {data: {id: orderId, paymentType: paymentType}} = useSelector(orderSelector);

  return (
    <Box p={2} className={classes.root}>
      <Box mb={2}>
        <Grid container alignItems={"center"} justify={"center"} spacing={2}>
          <Grid item>
            <Typography variant={"h4"}>
              <Box fontSize={14}>Thanh toán bằng:</Box>
            </Typography>
          </Grid>
          <Grid item xs>
            <Button variant="text" fullWidth onClick={handlePaymentChange}>
              <Grid container alignItems="center">
                <Grid item>
                  <Box component={mapPaymentIcon(paymentType)} style={{width: 40}}/>
                </Grid>
                <Grid item xs>
                  <Typography variant="h5">
                    <Box className={classes.paymentBtn}>{paymentConstant[paymentType].name}</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <ExpandLess/>
                </Grid>
              </Grid>
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
          {paymentType === paymentConstant.COD.code && <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={disablePlaceOrder}
              onClick={handleCheckout}
            >
              <Box className={classes.orderBtn}>Đặt hàng</Box>
            </Button>
          </Grid>}
          {/*<Grid item xs hidden={paymentType !== paymentConstant.VISA_MASTERCARD.code}>*/}
          {/*  <Button*/}
          {/*    variant="contained"*/}
          {/*    color="primary"*/}
          {/*    fullWidth*/}
          {/*    onClick={handleCheckout}*/}
          {/*    disabled={disablePlaceOrder}*/}
          {/*  >*/}
          {/*    <Box className={classes.orderBtn}>Thanh toán</Box>*/}
          {/*  </Button>*/}
          {/*</Grid>*/}
          {paymentType === paymentConstant.PAYPAL.code && <Grid item xs>
            <PayPalButtonComponent orderId={orderId} note={"note"} disabled={disablePlaceOrder}/>
          </Grid>}
          {paymentType === paymentConstant.ZALOPAY.code && <Grid item xs>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={disablePlaceOrder}
              onClick={handleCheckout}
            >
              <Box className={classes.orderBtn}>Thanh toán</Box>
            </Button>
          </Grid>}
        </Grid>
      </Box>
    </Box>
  );
}
