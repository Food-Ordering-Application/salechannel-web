import React, { useEffect, useRef } from 'react';
const BASEURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PRODUCTION_API
    : process.env.REACT_APP_LOCAL_API;
export default function PayPalButton() {
  const paypal = useRef();

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return fetch(`${BASEURL}/order/${orderId}/confirm-ord-checkout`, {
            method: 'post',
            headers: {
              'content-type': 'application/json',
            },
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (data) {
              return data.id; // Use the key sent by your server's response, ex. 'id' or 'token'
            });
        },
        onApprove: async (data, actions) => {
          return fetch(`${BASEURL}/order/${orderId}/approve-paypal-order`, {
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify({
              orderID: data.orderID,
            }),
          })
            .then(function (res) {
              return res.json();
            })
            .then(function (details) {
              alert(
                'Transaction funds captured from ' + details.payer_given_name
              );
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
      <div ref={paypal} />
    </div>
  );
}
