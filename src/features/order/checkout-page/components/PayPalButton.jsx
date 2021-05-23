import React, {useEffect, useRef} from 'react';
import {useSelector} from 'react-redux';
import {orderSelector} from '../../OrderSlice';
import {paymentConstant} from '../../../../constants/paymentConstant';
import {OrderApi} from '../../../../api/OrderApi';

// const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

export default function PayPalButton({note}) {
  const {
    data: {
      id: orderId,
      subTotal,
      delivery: {shippingFee},
      paypalOrderId,
    },
  } = useSelector(orderSelector);
  const paypal = useRef();

  console.log(orderId);
  console.log(note);
  console.log(paypalOrderId);

  useEffect(() => {
    window.paypal.Buttons({
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
        tagline: false,
      },

      createOrder: function (data, actions, err) {
        return OrderApi.confirmOrder(
          orderId,
          note,
          paymentConstant.PAYPAL.code
        ).then(function (data) {
          console.log(data);
          return data.paypalOrderId;
        });
      },

      onApprove: function (data, actions) {
        OrderApi.approvePaypal(paypalOrderId)
          .then(function (details) {
            alert('Transaction funds captured from ' + details.payer_given_name);
          });
      },

      onError: function (err) {
        console.log(err);
      },

    }).render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}/>
    </div>
  );
}
