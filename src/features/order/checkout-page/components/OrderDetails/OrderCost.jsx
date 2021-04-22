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

export default function OrderCost({subtotal, distance, deliveryFees}) {
  const classes = useStyles();
  return (
    <Box>
      <Box pb={1.5}>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6">
              <Box className={classes.label}>Tổng đơn</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Box className={classes.price}>{`${subtotal.toLocaleString()}đ`}</Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container justify="space-between">
          <Grid item>
            <Typography variant="h6">
              <Box className={classes.label}>{`Phí vận chuyển (${distance}km)`}</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Box className={classes.price}>{`${deliveryFees.toLocaleString()}đ`}</Box>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}