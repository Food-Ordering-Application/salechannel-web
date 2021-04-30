import React from "react";
import {Box, ButtonBase, Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {currencyFormatter} from "../../../../untils/formatter";

const useStyles = makeStyles((theme) => ({
  root: ({selected}) => ({
    width: "100%",
    background: selected ? theme.palette.secondary.l1 : `transparent`,
    padding: theme.spacing(1, 2, 1, 2),
    textAlign: `start`,
    transitionDuration: `0.375s`,
    transitionTimingFunction: `ease-in-out`,
  }),

}))

export default function ToppingItem({name, price, selected, onClick}) {
  const classes = useStyles({selected});

  return (
    <>
      <ButtonBase className={classes.root} onClick={onClick}>
        <Grid container wrap="nowrap" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">
              <Box fontSize={11}>{name}</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Box fontSize={14} color="onSurface.disabled">{currencyFormatter(price)}</Box>
            </Typography>
          </Grid>
        </Grid>
      </ButtonBase>
      <Divider variant="fullWidth"/>
    </>
  );
}