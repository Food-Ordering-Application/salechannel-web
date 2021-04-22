import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";

import LocationCard from "./components/LocationCard";
import OrderDetails from "./components/OrderDetails";
import CouponList from "./components/CouponList";
import MainActionsBottom from "./components/MainActionsBottom";


const useStyles = makeStyles(theme => ({
  mainActionsBottom: {
    position: `fixed`,
    bottom: 0,
    left: 0,
    right: 0,
  }
}));

export default function Checkout() {
  const classes = useStyles();

  return (
    <Box p={1}>
      <Box>
        <LocationCard location={"225 Nguyễn Văn Cừ, phường 4, quận 5, Thành phố Hồ Chí Minh"}/>
      </Box>
      <Box my={2}>
        <OrderDetails/>
      </Box>
      <Box mx={-1}>
        <CouponList/>
      </Box>
      <Box py={10}/>
      <Box className={classes.mainActionsBottom}>
        <MainActionsBottom totalCost={58000}/>
      </Box>
    </Box>
  );
}