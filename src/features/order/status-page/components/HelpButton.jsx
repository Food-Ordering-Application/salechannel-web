import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor: theme.palette.surface.light,
  },
  text: {
    fontSize: theme.spacing(2.25),
    lineHeight: `normal`,
    color: `inherit`,
  },
}))

export default function HelpButton(props) {
  const classes = useStyles();
  return (
    <Button variant="outlined" color="primary" fullWidth {...props} className={classes.root}>
      <Typography variant="h3" color="inherit">
        <Box py={0.5} className={classes.text}>{props.children}</Box>
      </Typography>
    </Button>
  );
}