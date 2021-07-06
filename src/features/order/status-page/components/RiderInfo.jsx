import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {LocationOn} from "@material-ui/icons";

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

export default function RiderInfo({id, avatar, name, licensePlate, orderId}) {
  const classes = useStyles();

  return (
    <Paper key={id} className={classes.root}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          {/*<Avatar src={avatar || `https://st.quantrimang.com/photos/image/2017/04/08/anh-dai-dien-FB-200.jpg`}/>*/}
          <Avatar src="https://www.shareicon.net/data/128x128/2016/06/27/787157_people_512x512.png"/>
        </Grid>
        <Grid item xs>
          <Box pl={1}>
            <Typography variant="h6">
              {/*<Box className={classes.name}>{name}</Box>*/}
              <Box className={classes.name}>"Nguyễn Thị Bích Ngọc"</Box>
            </Typography>
            <Typography variant="h4">
              {/*<Box className={classes.plate}>{licensePlate}</Box>*/}
              <Box className={classes.plate}>{"70LA-0587"}</Box>
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <IconButton component={Link} to={`/order/${orderId}/location`}>
            <LocationOn color="primary"/>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}