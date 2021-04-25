import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: (props) => ({
    borderRadius: theme.spacing(1),
    backgroundColor: props.variant === `outlined` ? theme.palette.surface.light
      : props.variant === `contained` ? theme.palette.primary.main : `transparent`,
  }),
  text: (props) => ({
    fontSize: theme.spacing(2.25),
    lineHeight: `normal`,
    color: props.variant === `contained` ? theme.palette.surface.light : `inherit`,
  }),
}))

export default function BottomButton(props) {
  const classes = useStyles(props);
  return (
    <Button color="primary" fullWidth {...props} className={classes.root}>
      <Typography variant="h3" color="inherit">
        <Box py={0.5} className={classes.text}>{props.children}</Box>
      </Typography>
    </Button>
  );
}