import React from 'react';
import {Box, Dialog, DialogTitle, ListItem, ListItemIcon, ListItemText, Typography,} from '@material-ui/core';
import {paymentConstant} from '../../../../constants/paymentConstant';
import {CreditCard} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {setPaymentType} from "../../OrderSlice";
import {restaurantSelector} from "../../../restaurant/RestaurantSlice";
import ZaloPay from "../../../../asserts/icons/ZaloPay";
import PayPal from "../../../../asserts/icons/PayPal";
import CashOnDelivery from "../../../../asserts/icons/CashOnDelivery";

export const mapPaymentIcon = (paymentTypes) => {
  switch (paymentTypes) {
    case paymentConstant.VISA_MASTERCARD.code:
      return CreditCard;
    case paymentConstant.COD.code:
      // return LocalAtm;
      return CashOnDelivery;
    case paymentConstant.PAYPAL.code:
      // return PayPalIcon;
      return PayPal;
    case paymentConstant.ZALOPAY.code:
      return ZaloPay;
    default:
      return null;
  }
};

export default function PaymentDialog({open, onClose}) {
  const dispatch = useDispatch();
  const {restaurant: {merchantIdInPayPal}} = useSelector(restaurantSelector);

  const allPayment = Object.entries(paymentConstant).filter((data) => {
    if (data[0] === paymentConstant.VISA_MASTERCARD.code)
      return false;
    if (data[0] === paymentConstant.PAYPAL.code)
      return merchantIdInPayPal !== null;
    return true
  });
  const paymentTypes = allPayment.map(([k, v]) => ({
    value: v.code,
    text: v.name,
  }));

  const onPaymentChange = (paymentType) => {
    dispatch(setPaymentType(paymentType));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="h4">
          <Box textAlign="center" color="onSurface.highEmphasis">
            Phương thức thanh toán
          </Box>
        </Typography>
      </DialogTitle>
      {paymentTypes.map(({text, value}) => (
        <ListItem key={value} button onClick={() => onPaymentChange(value)}>
          <ListItemIcon>
            <Box style={{width: 40}} pr={2} component={mapPaymentIcon(value)}/>
          </ListItemIcon>
          <ListItemText primary={text}/>
        </ListItem>
      ))}
    </Dialog>
  );
}
