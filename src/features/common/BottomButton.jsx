import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    position: `fixed`,
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(0, 2, 2, 2),
  },
  button: (props) => ({
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
    <Box className={classes.root}>
      <Button color="primary" fullWidth {...props} className={classes.button}>
        <Typography variant="h3" color="inherit">
          <Box py={0.5} className={classes.text}>{props.children}</Box>
        </Typography>
      </Button>
    </Box>
  );
}