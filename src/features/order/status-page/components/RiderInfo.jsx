import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import LocationIcon from "../../../../asserts/icons/Location";
import PhoneIcon from "../../../../asserts/icons/Phone";
import ChatIcon from "../../../../asserts/icons/Chat";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp10.boxShadow,
    padding: theme.spacing(1, 1, 1, 2),
  },
  name:{
    fontSize: theme.spacing(1.5),
    color: theme.palette.surface.dark,
    textTransform: `capitalize`,
  },
  plate:{
    fontSize: theme.spacing(1.5),
    color: theme.palette.surface.dark,
    textTransform: `uppercase`,
  }
}));

export default function RiderInfo() {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Avatar src="https://i.pinimg.com/564x/e6/57/55/e65755e73d8085e30aedfa21fde07f1b.jpg"/>
        </Grid>
        <Grid item xs>
          <Box pl={1}>
            <Typography variant="h6">
              <Box className={classes.name}>nguyễn văn tài xế</Box>
            </Typography>
            <Typography variant="h4">
              <Box className={classes.plate}>60ld-99999</Box>
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <IconButton>
            <ChatIcon color="primary"/>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <PhoneIcon color="primary"/>
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <LocationIcon color="primary"/>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}