import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, IconButton, Typography} from "@material-ui/core";
import {ChevronLeft, Home} from "@material-ui/icons";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.surface.light,
    boxShadow: theme.effect.dp08.boxShadow,
  },
  label: {
    fontSize: theme.spacing(2.25),
    lineHeight: `normal`,
    textAlign: `center`,
    textTransform: `capitalize`,
    color: theme.palette.surface.dark,
  },
}));

export default function TopNavigationBar({label, leftIcon, leftAction, rightIcon, rightAction}) {
  const classes = useStyles();
  const history = useHistory();

  const leftActionDefault = () => history.goBack();
  const rightActionDefault = () => history.push('/');

  return (
    <Grid container justify="space-between" alignItems="center" className={classes.root}>
      <Grid item>
        <IconButton color="primary" onClick={leftAction || leftActionDefault}>
          <Box color="inherit" component={leftIcon || ChevronLeft}/>
        </IconButton>
      </Grid>
      <Grid item xs>
        <Typography variant="h3">
          <Box className={classes.label}>{label}</Box>
        </Typography>
      </Grid>
      <Grid item>
        <IconButton color="primary" onClick={rightAction || rightActionDefault}>
          <Box color="inherit" component={rightIcon || Home}/>
        </IconButton>
      </Grid>
    </Grid>
  );
}