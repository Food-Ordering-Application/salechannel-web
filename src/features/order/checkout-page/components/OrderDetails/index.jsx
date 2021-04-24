import React from "react";
import {Box, Divider, Typography} from "@material-ui/core";
import OrderItem from "./OrderItem";
import {makeStyles} from "@material-ui/core/styles";
import OrderCost from "./OrderCost";

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

  }))
;

export default function OrderDetails({additionComponent}) {
  const classes = useStyles();

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
            <OrderItem quantity={1} name="Cơm gà xối mỡ" price={20000} description="Cam, Soda, Hoa cúc"/>
            <OrderItem quantity={1} name="Cơm gà xối mắm tỏi" price={21000} description="Cam, Soda, Hoa cúc"/>
          </Box>
          <Divider variant="fullWidth"/>
          <Box py={1.5}>
            <OrderCost subtotal={41000} distance={1.4} deliveryFees={17000}/>
          </Box>
        </Box>
        <Box>
          {additionComponent}
        </Box>
      </Box>
    </div>
  );
}