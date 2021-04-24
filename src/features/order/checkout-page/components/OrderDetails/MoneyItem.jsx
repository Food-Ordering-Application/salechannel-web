import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.highEmphasis,
  },
  price: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.disabled,
  }
}));

export default function MoneyItem({label, value}) {
  const classes = useStyles();

  return (
    <Grid container justify="space-between">
      <Grid item>
        <Typography variant="h6">
          <Box className={classes.label}>{label}</Box>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6">
          <Box className={classes.price}>{`${value.toLocaleString()}đ`}</Box>
        </Typography>
      </Grid>
    </Grid>
  );
}