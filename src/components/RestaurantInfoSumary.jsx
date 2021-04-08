import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
      width: `65%`,
      height: `max-content`,
      borderRadius: theme.spacing(1),
      margin: `auto`,
      padding: theme.spacing(2),
      boxShadow: `0px 4px 4px rgba(255, 107, 53, 0.1)`,
    },
    address: {
      marginTop: theme.spacing(1),
      textAlign: `center`,
      color: theme.palette.onSurface.mediumEmphasis,
      maxHeight: theme.typography.body2.lineHeight,
      whiteSpace: 'nowrap',
      overflow: `hidden`,
      textOverflow: `ellipsis`,
    }
  })
);

export default function RestaurantInfoSumary({name, address, distance}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h4">
        <Box textAlign="center">{name}</Box>
      </Typography>
      <Typography variant="body2" component= "div">
        <Box className={classes.address}>{distance} km - {address}</Box>
      </Typography>
    </Paper>
  );
}