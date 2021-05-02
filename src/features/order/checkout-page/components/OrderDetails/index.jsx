import React, {useState} from "react";
import {Box, Divider, Typography} from "@material-ui/core";
import OrderItem from "./OrderItem";
import {makeStyles} from "@material-ui/core/styles";
import OrderCost from "./OrderCost";
import {useSelector} from "react-redux";
import {orderSelector} from "../../../OrderSlice";
import ProductDetail from "../../../../restaurant/product-detail-dialog/ProductDetail";

const useStyles = makeStyles(theme => ({
    root: {
      borderRadius: theme.spacing(1),
      boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.08)`,
      background: `linear-gradient(-45deg, #ffffff 16px, transparent 0), linear-gradient(45deg, #ffffff 16px, transparent 0)`,
      "&::after": {
        backgroundPosition: `left-bottom`,
        backgroundRepeat: `repeat - x`,
        backgroundSize: `32px 32px`,
        content: " ",
        display: `block`,
        position: `absolute`,
        bottom: 0,
        left: 0,
        width: `100%`,
        height: `32px`,
      }
    },
  })
);

export default function OrderDetails({additionComponent}) {
  const classes = useStyles();
  const {data: {orderItems, subTotal, shippingFee, serviceFee}} = useSelector(orderSelector);
  const [open, setOpen] = useState(false);
  const [selectedItem, setItem] = useState(null);

  const orderItemsList = orderItems.map((item) => {
    let itemPrice = item.price;
    for (const topping of item.orderItemToppings) {
      itemPrice += topping.price;
    }
    return <OrderItem quantity={item.quantity}
                      name="Name from API's response"
                      price={itemPrice}
                      description="Description from API's response"
                      onClick={() => {
                        setItem(item);
                        setOpen(true);
                      }}/>
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
            <OrderCost subtotal={subTotal} distance={1.4} deliveryFees={shippingFee + serviceFee}/>
          </Box>
        </Box>
        <Box>
          {additionComponent}
        </Box>
      </Box>
      {selectedItem && <ProductDetail open={open}
                                      handleClose={() => setOpen(false)}
                                      product={selectedItem}/>
      }
    </div>
  );
}