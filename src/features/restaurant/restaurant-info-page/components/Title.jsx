import React from "react";
import {Box, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.highEmphasis,
    padding: theme.spacing(1, 0),
  }
}))

export default function Title({text, children}) {
  const classes = useStyles();

  return (
    <Typography variant="h4">
      <Box className={classes.text}>{text || children}</Box>
    </Typography>
  );
}