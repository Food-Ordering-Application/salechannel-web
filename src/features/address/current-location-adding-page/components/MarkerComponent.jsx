import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {LocationOn} from "@material-ui/icons";
import {Box, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: `absolute`,
    transform: `translate(-50%, -100%)`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: "center",
  }
}));

export default function MarkerComponent({address, isPending}) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper>{address}</Paper>
      <Box component={LocationOn} fontSize={25}/>
    </Box>
  );
}