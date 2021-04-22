import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    borderLeftColor: theme.palette.primary.main,
    borderLeftWidth: theme.spacing(1),
    borderRadius: theme.spacing(1, 0, 0, 1),
    margin: 0,
    padding: theme.spacing(1),
  },
  code: {
    fontSize: theme.spacing(1.25),
    textTransform: `uppercase`,
    color: theme.palette.onSurface.mediumEmphasis,
  },
  description: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.highEmphasis,
  },
  expireDate: {
    fontSize: theme.spacing(1.25),
    color: theme.palette.onSurface.mediumEmphasis,
  }
}));

export default function CouponItem({code, description, expireAt, handleShowDetails, handleApply}) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Box>
        <Typography variant="h5">
          <Box className={classes.code}>{code}</Box>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h4">
          <Box className={classes.description}>{description}</Box>
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5">
          <Box className={classes.expireDate}>{`EXP: ${new Date(expireAt).toDateString()}`}</Box>
        </Typography>
      </Box>
    </Paper>
  );
}