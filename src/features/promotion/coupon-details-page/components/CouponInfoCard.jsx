import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, Paper, Typography} from "@material-ui/core";
import {datetimeFormatter} from "../../../../untils/formatter";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(2),
    boxShadow: theme.effect.dp10.boxShadow,
  },
  code: {
    fontSize: theme.spacing(2),
    padding: theme.spacing(0.25, 1),
    borderRadius: theme.spacing(2),
    color: theme.palette.surface.light,
    backgroundColor: theme.palette.primary.main,
  },
  name: {
    fontSize: theme.spacing(3),
    color: theme.palette.onSurface.highEmphasis,
    overflowWrap: `break-word`,
  },
  labelDate: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.disabled,
  },
  date: {
    marginLeft: theme.spacing(0.5),
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.mediumEmphasis,
  },
}));

export default function CouponInfoCard({code, name, expirationDate}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Typography variant="h5">
            <Box className={classes.code}>{code}</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h3">
            <Box className={classes.name}>{name}</Box>
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h4">
            <Grid container wrap="nowrap">
              <Grid item className={classes.labelDate}>Hạn dùng:</Grid>
              <Grid item className={classes.date}>{datetimeFormatter(expirationDate)}</Grid>
            </Grid>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}