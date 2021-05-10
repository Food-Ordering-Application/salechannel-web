import React from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {currencyFormatter} from "../untils/formatter";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    width: `100%`,
    height: theme.spacing(6),
    borderRadius: theme.spacing(1, 1, 0, 0),
    background: theme.palette.primary.main,
    display: `flex`,
    flexDirection: `row`,
    alignItems: `center`,
    padding: theme.spacing(0, 2),
    textDecoration: `none`,
  },
  text: {
    fontSize: theme.spacing(2),
    color: theme.palette.surface.light,
  }

}));

export default function CartSummaryBottom({cart, toCheckout}) {
  const {orderItems = [], total = 0} = cart;
  let quantity = 0;
  for (const item of orderItems) {
    quantity += item.quantity;
  }

  const classes = useStyles();

  return (
    <Box className={classes.container} component={Link} to={toCheckout}>
      <Box id="CartInfo">
        <Typography variant="h3">
          <Box className={classes.text}>
            {`${quantity} ${quantity > 1 ? "Items" : "Item"}｜${currencyFormatter(total)}`}
          </Box>
        </Typography>
      </Box>
      <Box flexGrow={1}/>
      <Box id="ViewCart">
        <Typography variant="h3">
          <Box className={classes.text}>View Cart</Box>
        </Typography>
      </Box>
    </Box>
  );
}