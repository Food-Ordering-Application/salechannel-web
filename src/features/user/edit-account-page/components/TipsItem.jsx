import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp00.boxShadow,
  },
  icon: {
    fontSize: `24px`,
    backgroundColor: theme.palette.primary.l2,
    color: theme.palette.onPrimary.highEmphasis,
    padding: theme.spacing(0.5),
    borderRadius: theme.spacing(1),
  },
  text: {
    fontSize: `12px`,
  }
}))

export default function TipsItem({icon, text, hidden}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root} hidden={hidden}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item>
          <Box className={classes.icon} component={icon}/>
        </Grid>
        <Grid item xs>
          <Typography variant="h5">
            <Box className={classes.text}>{text}</Box>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}