import React from "react";
import {Box, makeStyles, Typography} from "@material-ui/core";
import {currencyFormatter} from "../untils/formatter";

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
  },
  text: {
    fontSize: theme.spacing(2),
    color: theme.palette.surface.light,
  }

}));

export default function CartSummaryBottom({cart}) {
  const classes = useStyles();
  let quantity = 0;
  let totalCost = 0;
  cart.forEach((item) => {
    quantity += item.quantity;
    totalCost += item.quantity * item.price + (item.option ? item.option.price : 0);
  });

  return (
    <Box className={classes.container} onClick={() => alert(`Developing...`)}>
      <Box id="CartInfo">
        <Typography variant="h3">
          <Box className={classes.text}>
            {`${quantity} ${quantity > 1 ? "Items" : "Item"}｜${currencyFormatter(totalCost)}`}
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