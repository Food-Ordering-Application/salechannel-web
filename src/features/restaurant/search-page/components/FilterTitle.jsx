import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(5),
    backgroundColor: theme.palette.stateBlackOverlay.selected,
    width: `fit-content`,
    height: `max-content`,
    padding: theme.spacing(0.25, 1),
  }
}))

export default function FilterTitle({children}) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography variant="h6">{children}</Typography>
    </Box>
  );
}