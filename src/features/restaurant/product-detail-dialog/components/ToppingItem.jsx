import React from "react";
import {Box, ButtonBase, Divider, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {currencyFormatter} from "../../../../untils/formatter";

const useStyles = makeStyles((theme) => ({
  root: ({selected}) => ({
    width: "100%",
    padding: theme.spacing(1, 2, 1, 2),
    textAlign: `start`,
    transitionDuration: `0.375s`,
    transitionTimingFunction: `ease-in-out`,
  }),
  label: ({selected}) => ({
    color: selected ? theme.palette.onSurface.highEmphasis : theme.palette.onSurface.disabled,
  }),
  price: ({selected}) => ({
    color: selected ? theme.palette.primary.main : theme.palette.onSurface.disabled,
    fontWeight: selected ? 600 : 'inherit',
  })
}))

export default function ToppingItem({name, price, selected, onClick}) {
  const classes = useStyles({selected});

  return (
    <>
      <ButtonBase className={classes.root} onClick={onClick}>
        <Grid container wrap="nowrap" justify="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">
              <Box fontSize={13} color={selected ? "onSurface.highEmphasis" : "onSurface.disabled"}>{name}</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6">
              <Box fontSize={14} className={classes.price}>{currencyFormatter(price)}</Box>
            </Typography>
          </Grid>
        </Grid>
      </ButtonBase>
      <Divider variant="fullWidth"/>
    </>
  );
}