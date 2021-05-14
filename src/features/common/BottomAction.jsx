import React from "react";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: ({padding}) => ({
    position: `absolute`,
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(padding),
  }),
}));

export default function BottomAction({padding = 0, children}) {
  const classes = useStyles({padding});

  return (
    <Box className={classes.container}>{children}</Box>
  );
}