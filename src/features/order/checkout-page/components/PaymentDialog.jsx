import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@material-ui/core';
import {paymentConstant} from '../../../../constants/paymentConstant';
import {CreditCard, LocalAtm} from '@material-ui/icons';
import PayPalIcon from '../../../../asserts/icons/PayPalIcon';
import {useDispatch} from "react-redux";
import {setPaymentType} from "../../OrderSlice";

export const mapPaymentIcon = (paymentTypes) => {
  switch (paymentTypes) {
    case paymentConstant.VISA_MASTERCARD.code:
      return CreditCard;
    case paymentConstant.COD.code:
      return LocalAtm;
    case paymentConstant.PAYPAL.code:
      return PayPalIcon;
    default:
      return null;
  }
};

export default function PaymentDialog({open, onClose}) {
  const dispatch = useDispatch();
  const paymentTypes = Object.entries(paymentConstant).map(([k, v]) => ({
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
            <Box component={mapPaymentIcon(value)}/>
          </ListItemIcon>
          <ListItemText primary={text}/>
        </ListItem>
      ))}
    </Dialog>
  );
}
