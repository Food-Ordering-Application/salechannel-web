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
  },
  dotCarousel: {
    position: `relative`,
    left: `-9999px`,
    width: `10px`,
    height: `10px`,
    borderRadius: `50%`,
    backgroundColor: `white`,
    color: `white`,
    boxShadow: `9984px 0 0 0 white, 9999px 0 0 0 white, 10014px 0 0 0 white`,
    animation: `$dotCarousel 1.5s infinite linear`,
  },
  "@keyframes dotCarousel": {
    "0%": {
      boxShadow: `9984px 0 0 -1px white, 9999px 0 0 1px white, 10014px 0 0 -1px white`,
    },
    "50%": {
      boxShadow: `10014px 0 0 -1px white, 9984px 0 0 -1px white, 9999px 0 0 1px white`,
    },
    "100%": {
      boxShadow: `9999px 0 0 1px white, 10014px 0 0 -1px white, 9984px 0 0 -1px white`,
    }
  }
}));

export default function CartSummaryBottom({cart, toCheckout, isLoading}) {
  const {orderItems = [], subTotal = 0} = cart;
  let quantity = 0;
  for (const item of orderItems) {
    quantity += item.quantity;
  }

  const classes = useStyles();

  return (
    <Box className={classes.container} component={isLoading ? Box : Link} to={toCheckout}>
      <Box id="CartInfo">
        <Typography variant="h3">
          <Box className={classes.text}>
            {`${quantity} ${quantity > 1 ? "Items" : "Item"}｜${currencyFormatter(subTotal)}`}
          </Box>
        </Typography>
      </Box>
      <Box flexGrow={1}/>
      <Box id="ViewCart">
        {
          isLoading
            ? (
              <Box pr={2}>
                <div className={classes.dotCarousel}/>
              </Box>
            )
            : (
              <Typography variant="h3">
                <Box className={classes.text}>View Cart</Box>
              </Typography>
            )
        }
      </Box>
    </Box>
  );
}