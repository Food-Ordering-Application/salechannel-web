import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {approvePaypal, confirmOrder, orderSelector} from "../../OrderSlice";
import {paymentConstant} from "../../../../constants/paymentConstant";

// const BASEURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PRODUCTION_API : process.env.REACT_APP_LOCAL_API;

export default function PayPalButton({note}) {
  const dispatch = useDispatch();
  const {data: {id: orderId, subTotal, delivery: {shippingFee}}} = useSelector(orderSelector);
  const paypal = useRef();

  useEffect(() => {
    window.paypal.Buttons({
      createOrder: function (data, actions, err) {
        dispatch(confirmOrder({orderId: orderId, paymentType: paymentConstant.PAYPAL.code, note}));
        return actions.order.create({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                value: subTotal + shippingFee,
              },
            },
          ],
        });
        // return fetch(`${BASEURL}/order/${orderId}/confirm-ord-checkout`, {
        //   method: 'post',
        //   headers: {
        //     'content-type': 'application/json',
        //   },
        // })
        //   .then(function (res) {
        //     return res.json();
        //   })
        //   .then(function (data) {
        //     return data.id; // Use the key sent by your server's response, ex. 'id' or 'token'
        //   });
      },
      onApprove: async function (data, actions) {
        const order = await actions.order.capture();
        console.log(order);
        dispatch(approvePaypal({orderId: orderId, paypalOrderId: order["id"] || `somthing-like-that`}))
        // return fetch(`${BASEURL}/order/${orderId}/approve-paypal-order`, {
        //   headers: {
        //     'content-type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     orderID: data.orderID,
        //   }),
        // })
        //   .then(function (res) {
        //     return res.json();
        //   })
        //   .then(function (details) {
        //     alert(
        //       'Transaction funds captured from ' + details.payer_given_name
        //     );
        //   });
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
