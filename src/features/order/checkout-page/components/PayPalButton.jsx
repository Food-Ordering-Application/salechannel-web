import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {orderSelector} from '../../OrderSlice';
import {paymentConstant} from '../../../../constants/paymentConstant';
import {OrderApi} from '../../../../api/OrderApi';
import {restaurantSelector} from "../../../restaurant/RestaurantSlice";
import {PayPalButton} from "react-paypal-button-v2";

export default function PayPalButtonComponent() {
  const {
    data: {
      id: orderId,
      note,
      subTotal,
      delivery: {shippingFee},
    },
  } = useSelector(orderSelector);
  const {restaurant: {merchantIdInPayPal}} = useSelector(restaurantSelector);
  const [paypalOrderId, setPaypalOrderId] = useState(``);

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

  const buttonOptions = {
    clientId: process.env.REACT_APP_CLIENT_ID,
    merchantId: merchantIdInPayPal,
    disableFunding: `credit,card`,
  };

  /*
  CALLBACK
   */

  const createOrder = function (data, actions) {

    OrderApi
      .confirmOrder(orderId, note, paymentConstant.PAYPAL.code)
      .then(({paypalOrderId}) => {
        setPaypalOrderId(paypalOrderId);
      })
      .catch((error) => {
        console.log(error);
      });

    return actions.order.create({
      purchase_units: [{
        amount: {
          currency_code: "USD",
          value: "0.01"
        }
      }],
    });
  };

  const onApprove = function (data, actions) {
    return actions.order.capture().then(function (details) {
      alert("Transaction completed by " + details[`payer`][`name`][`given_name`]);
      return OrderApi.approvePaypal(orderId, paypalOrderId)
        .then(function (details) {
          alert('Transaction funds captured from ' + details[`payer_given_name`]);
        });
    })
  };

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