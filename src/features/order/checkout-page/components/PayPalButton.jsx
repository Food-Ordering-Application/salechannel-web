import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { orderSelector } from '../../OrderSlice';
import { paymentConstant } from '../../../../constants/paymentConstant';
import { OrderApi } from '../../../../api/OrderApi';
import { restaurantSelector } from '../../../restaurant/RestaurantSlice';
import { PayPalButton } from 'react-paypal-button-v2';

export default function PayPalButtonComponent() {
  const {
    data: {
      id: orderId,
      note,
      subTotal,
      delivery: { shippingFee },
    },
  } = useSelector(orderSelector);
  const {
    restaurant: { merchantIdInPayPal },
  } = useSelector(restaurantSelector);
  const [paypalOrderId, setPaypalOrderId] = useState(null);

  /*
  STYLES & OPTIONS
   */

  const buttonStyle = {
    layout: 'vertical',
    color: 'gold',
    shape: 'rect',
    label: 'paypal',
    tagline: false,
  };

  console.log('PAYPAL_CLIENT_ID', process.env.REACT_APP_CLIENT_ID);

  const buttonOptions = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    merchantId: merchantIdInPayPal,
    disableFunding: `credit,card`,
  };

  /*
  CALLBACK
   */

  const createOrder = async (data, actions) => {
    console.log(merchantIdInPayPal);
    try {
      const data = await OrderApi.confirmOrder(
        orderId,
        note,
        paymentConstant.PAYPAL.code,
        merchantIdInPayPal
      );

      const { paypalOrderId } = data;

      console.log('PAYPAL ORDER ID', paypalOrderId);
      setPaypalOrderId(paypalOrderId);
      return paypalOrderId;
    } catch (err) {
      console.log(err);
    }
  };

  const onApprove = useCallback(
    (data, actions) => {
      console.log('PAYPAL ORDER IDDDDDD', paypalOrderId);
      OrderApi.approvePaypal(orderId, paypalOrderId).then(function (details) {
        alert('Transaction funds captured from ' + details[`payer_given_name`]);
      });
    },
    [paypalOrderId, orderId]
  );

  return (
    <PayPalButton
      style={buttonStyle}
      options={buttonOptions}
      createOrder={createOrder}
      onApprove={onApprove}
      onError={(error) => console.log(error)}
    />
  );
}
