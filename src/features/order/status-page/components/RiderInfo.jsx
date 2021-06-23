import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import LocationIcon from "../../../../asserts/icons/Location";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp10.boxShadow,
    padding: theme.spacing(1, 1, 1, 2),
  },
  name: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.surface.dark,
    textTransform: `capitalize`,
  },
  plate: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.surface.dark,
    textTransform: `uppercase`,
  }
}));

export default function RiderInfo({link}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Avatar src="https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg"/>
        </Grid>
        <Grid item xs>
          <Box pl={1}>
            <Typography variant="h6">
              <Box className={classes.name}>nguyễn văn A</Box>
            </Typography>
            {/*<Typography variant="h4">*/}
            {/*  <Box className={classes.plate}>60ld-99999</Box>*/}
            {/*</Typography>*/}
          </Box>
        </Grid>
        <Grid item>
          <IconButton component={Link} to={link}>
            <LocationIcon color="primary"/>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}