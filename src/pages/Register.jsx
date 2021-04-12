import React from "react";
import {Box, makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
      width: "100%",
    }
  })
);

export default function Register() {
  const classes = useStyles();

  return (
    <Box className={classes.container}>

    </Box>
  );
}