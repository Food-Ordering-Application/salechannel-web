import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {approvePaypal, orderSelector} from '../../OrderSlice';
import {paymentConstant} from '../../../../constants/paymentConstant';
import {OrderApi} from '../../../../api/OrderApi';
import {restaurantSelector} from '../../../restaurant/RestaurantSlice';
import {PayPalButton} from 'react-paypal-button-v2';
import Ribbon from "../../../common/Ribbon";

export default function PayPalButtonComponent({disabled}) {
  const {
    data: {
      id: orderId,
      note,
    },
  } = useSelector(orderSelector);
  const {
    restaurant: {merchantIdInPayPal},
  } = useSelector(restaurantSelector);
  const dispatch = useDispatch();

  /*
  STYLES & OPTIONS
   */

  const buttonStyle = {
    layout: 'vertical',
    color: disabled ? 'silver' : 'gold',
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

  const createOrder = async function (data, actions) {
    try {
      const data = await OrderApi.confirmOrder(
        orderId,
        note,
        paymentConstant.PAYPAL.code,
        merchantIdInPayPal
      );

      const {paypalOrderId} = data;

      return paypalOrderId;
    } catch (err) {
      console.log(err);
    }
  };

  const onApprove = async function (data, actions) {
    const {id} = await actions.order.get();
    dispatch(approvePaypal({orderId, paypalOrderId: id}));
  };

  return (
    <Ribbon disabled={disabled}>
      <PayPalButton
        style={buttonStyle}
        options={buttonOptions}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={(error) => console.log(error)}
      />
    </Ribbon>
  );
}
