import React from "react";
import {Box, Divider, Grid, Typography} from "@material-ui/core";
import OrderItem from "./OrderItem";
import {makeStyles} from "@material-ui/core/styles";
import OrderCost from "./OrderCost";
import {DescriptionOutlined} from "@material-ui/icons";
import Ribbon from "../../../../common/Ribbon";

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
    note: {
      fontSize: theme.spacing(1.5),
      color: theme.palette.onSurface.disabled,
      textAlign: `end`,
    },
  })
);

export default function OrderDetails({additionComponent, orderData, handleRemoveItem}) {
  const classes = useStyles();

  const {orderItems, subTotal, delivery: {distance, shippingFee}} = orderData;

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
          <Grid container alignItems="center">
            <Grid item>
              <Box p={1} component={DescriptionOutlined} fontSize={20} color="onSurface.mediumEmphasis"/>
            </Grid>
            <Grid item xs>
              <Ribbon p={1}>
                <Typography variant="h5">
                  <Box className={classes.note}>Thêm ghi chú đơn hàng</Box>
                </Typography>
              </Ribbon>
            </Grid>
          </Grid>
          <Divider variant="fullWidth"/>
          <Box py={1.5}>
            <OrderCost subtotal={subTotal} distance={distance} deliveryFees={shippingFee}/>
          </Box>
        </Box>
        <Box>
          {additionComponent}
        </Box>
      </Box>
    </div>
  );
}