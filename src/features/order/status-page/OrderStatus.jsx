import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import StatusCard from "./components/StatusCard";
import TopNavigationBar from "../../common/TopNavigationBar";

const useStyles = makeStyles((theme) => ({
  root: {},
  topNavigator: {
    display: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  }
}));

export default function OrderStatus() {
  const classes = useStyles();

  return (
    <Box mt={6} p={2}>
      <div className={classes.topNavigator}>
        <TopNavigationBar label="order status"/>
      </div>
      <Box py={2}><StatusCard/></Box>
    </Box>
  );
}