import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, IconButton, Typography} from "@material-ui/core";
import {ChevronLeft, Home} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import PendingBar from "./PendingBar";

const useStyles = makeStyles((theme) => ({
  container: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 5,
  },
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

export default function TopNavigationBar({
                                           label,
                                           leftIcon,
                                           leftAction,
                                           centerComponent,
                                           bottomComponent,
                                           rightIcon,
                                           rightAction,
                                           isPending,
                                           backButton = true,
                                           homeButton = true
                                         }) {
  const classes = useStyles();
  const history = useHistory();

  const leftActionDefault = () => history.goBack();
  const rightActionDefault = () => history.replace('/');

  return (
    <Box className={classes.container}>
      <Box className={classes.root}>
        <Grid container justify="space-between" alignItems="center">
          <Grid item>
            {
              backButton
                ?
                <IconButton color="primary" onClick={leftAction || leftActionDefault}>
                  <Box color="inherit" component={leftIcon || ChevronLeft}/>
                </IconButton>
                :
                <Box p={3}/>
            }
          </Grid>
          <Grid item xs>
            {centerComponent || (
              <Typography variant="h3">
                <Box className={classes.label}>{label}</Box>
              </Typography>
            )}
          </Grid>
          <Grid item>
            {
              homeButton
                ?
                <IconButton color="primary" onClick={rightAction || rightActionDefault}>
                  <Box width={24} height={24} color="inherit" component={rightIcon || Home}/>
                </IconButton>
                :
                <Box p={3}/>
            }
          </Grid>
        </Grid>
        <>{bottomComponent}</>
      </Box>
      <Box hidden={!isPending}>
        <PendingBar color="secondary"/>
      </Box>
    </Box>
  );
}