import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  label: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.mediumEmphasis,
  },
  info:{
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.mediumEmphasis,
  },
}));

export default function InfoItem({label, info}) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={4}>
        <Typography variant="h4">
          <Box className={classes.label}>{label}</Box>
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">
          <Box className={classes.info}>{info}</Box>
        </Typography>
      </Grid>
    </Grid>
  );
}