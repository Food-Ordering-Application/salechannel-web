import React from "react";
import {Box, Divider, Typography} from "@material-ui/core";
import OrderItem from "./OrderItem";
import {makeStyles} from "@material-ui/core/styles";
import OrderCost from "./OrderCost";

const useStyles = makeStyles(theme => ({
    root: {
      borderRadius: theme.spacing(1, 1, 0, 0),
      boxShadow: theme.effect.dp10.boxShadow,
      position: `relative`,
      "&::after": {
        position: `absolute`,
        left: 0,
        bottom: theme.spacing(-0.5),
        display: `block`,
        width: `100%`,
        height: theme.spacing(1),
        content: `""`,
        background: `linear-gradient(45deg, white 33.33%, transparent 33.33%, transparent 66.66%, white 66.66%), linear-gradient(-45deg, white 33.33%, transparent 33.33%, transparent 66.66%, white 66.66%)`,
        backgroundSize: theme.spacing(1, 2),
      }
    },
  })
);

export default function OrderDetails({additionComponent, orderData, handleRemoveItem}) {
  const classes = useStyles();

  const {orderItems, total, delivery: {shippingFee}} = orderData;

  const orderItemsList = orderItems.map((item) => {
    const {id: orderItemId} = item;
    let itemPrice = item.price;
    for (const topping of item.orderItemToppings) {
      itemPrice += topping.price;
    }
    return <OrderItem key={orderItemId}
                      quantity={item.quantity}
                      name="Name from API's response"
                      price={itemPrice}
                      description="Description from API's response"
                      onClick={() => handleRemoveItem(orderItemId)}/>
  });

  return (
    <div className={classes.root}>
      <Box p={1}>
        <Box>
          <Typography variant="h4">
            <Box fontSize={12} color="onSurface.mediumEmphasis">Chi tiết đơn hàng</Box>
          </Typography>
        </Box>
        <Box>
          <Box py={1}>
            {orderItemsList}
          </Box>
          <Divider variant="fullWidth"/>
          <Box py={1.5}>
            <OrderCost subtotal={total} distance={1.4} deliveryFees={shippingFee}/>
          </Box>
        </Box>
        <Box>
          {additionComponent}
        </Box>
      </Box>
    </div>
  );
}