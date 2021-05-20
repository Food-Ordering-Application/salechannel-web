import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {orderSelector} from '../../OrderSlice';
import {paymentConstant} from '../../../../constants/paymentConstant';
import {OrderApi} from "../../../../api/OrderApi";

// const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

export default function PayPalButton({note}) {
  const {
    data: {
      id: orderId,
      subTotal,
      delivery: {shippingFee},
      paypalOrderId
    },
  } = useSelector(orderSelector);
  const paypal = useRef();

  console.log(orderId);
  console.log(note);
  console.log(paypalOrderId);

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: function (data, actions, err) {
          return OrderApi.confirmOrder(orderId, note, paymentConstant.PAYPAL.code).then(function (res) {
            return res.json();
          }).then(function (data) {
            return data.id; // Use the key sent by your server's response, ex. 'id' or 'token'
          });
        },
        onApprove: function (data, actions) {
          return OrderApi.approvePaypal(paypalOrderId)
            .then(function (res) {
              return res.json();
            })
            .then(function (details) {
              alert('Transaction funds captured from ' + details.payer_given_name);
            });
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}/>
    </div>
  );
}
