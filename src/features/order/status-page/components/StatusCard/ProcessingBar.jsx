import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, Typography} from "@material-ui/core";
import {RadioButtonChecked, RadioButtonUnchecked} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {},
  text:{
    fontSize: theme.spacing(1.25),
    color: theme.palette.onSurface.highEmphasis,
  },
  disabledText:{
    fontSize: theme.spacing(1.25),
    color: theme.palette.onSurface.disabled,
  },
}));

export default function ProcessingBar() {
  const classes = useStyles();

  return (
    <Grid container justify="space-around" alignItems="flex-end">
      <Grid item>
        <Box>
          <Typography variant="h6">
            <Box className={classes.text}>12:20</Box>
          </Typography>
          <RadioButtonChecked color="secondary"/>
          <Typography variant="h6">
            <Box className={classes.text}>Ready</Box>
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <Typography variant="h6">
            <Box className={classes.text}>12:30</Box>
          </Typography>
          <RadioButtonChecked color="secondary"/>
          <Typography variant="h6">
            <Box className={classes.text}>Preparing</Box>
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <Typography variant="h6">
            <Box className={classes.text}>12:40</Box>
          </Typography>
          <RadioButtonChecked color="secondary"/>
          <Typography variant="h6">
            <Box className={classes.text}>Delivering</Box>
          </Typography>
        </Box>
      </Grid>
      <Grid item>
        <Box>
          <RadioButtonUnchecked color="secondary"/>
          <Typography variant="h6">
            <Box className={classes.disabledText}>Arrived</Box>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}