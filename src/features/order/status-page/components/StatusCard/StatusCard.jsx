import React from "react";
import {Box, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProcessingBar from "./ProcessingBar";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp10.boxShadow,
  },
  status: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.mediumEmphasis,
  },
  action: {
    fontSize: theme.spacing(2.25),
    color: theme.palette.onSurface.highEmphasis,
  },

}));

export default function StatusCard({statusText, actionText, step}) {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Box p={1.5} textAlign="center">
        <Typography variant="h4">
          <Box className={classes.status}>{statusText}</Box>
        </Typography>
        <Typography variant="h3">
          <Box className={classes.action}>{actionText}</Box>
        </Typography>
        <Box py={4}>
          <ProcessingBar step={step}/>
        </Box>
      </Box>
    </Paper>
  );
}