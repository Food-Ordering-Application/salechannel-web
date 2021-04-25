import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    height: `100vh`,
  }
}));

export default function ErrorPage() {
  const classes = useStyles();

  return (
    <Grid container justify="center" alignItems="center" className={classes.root}>
      <Grid item>
        <Typography variant="h4">
          <Box>Uh Oh, không thể kết nối đến máy chủ rồi!</Box>
        </Typography>
      </Grid>
    </Grid>
  );
}