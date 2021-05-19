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
import { paymentConstant } from '../../../../constants/paymentConstant';
import { CreditCard, LocalAtm } from '@material-ui/icons';
import PayPalIcon from '../../../../asserts/icons/PayPalIcon';

export const mapPaymentIcon = (paymentTypes) => {
  switch (paymentTypes) {
    case paymentConstant.CARD.code:
      return CreditCard;
    case paymentConstant.COD.code:
      return LocalAtm;
    case paymentConstant.PAYPAL.code:
      return PayPalIcon;
    default:
      return null;
  }
};

export default function PaymentDialog({ open, onClose, onChange }) {
  const paymentTypes = Object.entries(paymentConstant).map(([k, v]) => ({
    value: v.code,
    text: v.name,
  }));

  const handleItemClick = (value) => {
    onChange(value);
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
      {paymentTypes.map(({ text, value }) => (
        <ListItem key={value} button onClick={() => handleItemClick(value)}>
          <ListItemIcon>
            <Box component={mapPaymentIcon(value)} />
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </Dialog>
  );
}
