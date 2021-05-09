import {Box, Grid, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: `50vh`,
  },
}))

export default function PlaceHolder({icon, text}) {
  const classes = useStyles();

  return (
    <Grid direction="column" alignItems="center" justify="flex-end" className={classes.root} container>
      <Grid item>
        <Box mx="auto" fontSize={128} color="secondary.l0" component={icon}/>
      </Grid>
      <Grid item>
        <Typography variant="h4">
          <Box fontSize={24} color="onSurface.disabled">{text}</Box>
        </Typography>
      </Grid>
    </Grid>
  );
}