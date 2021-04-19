import {Box, Button, Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import React from "react";

export default function UserAuthButtonGroup(){
  return(
    <Grid container justify="center">
      <Grid item xs={6}>
        <Button variant="contained" color="primary" component={Link} to="/login">
          <Box color="surface.light">Đăng nhập</Box>
        </Button>
      </Grid>
      <Grid item xs="auto">
        <Button variant="outlined" color="primary" component={Link} to="/register">Đăng ký</Button>
      </Grid>
    </Grid>
  );
}