import React from "react";
import {Box, Grid, IconButton, Typography} from "@material-ui/core";
import {Cancel} from "@material-ui/icons";
import {currencyFormatter} from "../../../../../untils/formatter";

export default function OrderItem({quantity, name, description, price, handleRemove}) {
  return (
    <Box pb={1.5}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h6">
            <Box fontSize={14} color={"onSurface.disabled"}>{`${quantity}x`}</Box>
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">
            <Box fontSize={14} color="surface.dark">{name}</Box>
          </Typography>
          <Typography variant="h6">
            <Box fontSize={11} color="onSurface.disabled">{description}</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            <Box fontSize={14} color="onSurface.disabled">{currencyFormatter(price)}</Box>
          </Typography>
        </Grid>
        <Grid item>
          <IconButton size="small" onClick={handleRemove}>
            <Cancel fontSize="inherit" color="inherit"/>
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}