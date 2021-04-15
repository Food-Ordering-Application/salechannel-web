import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Button, Grid, Typography} from "@material-ui/core";
import bl from "./bl";
import {Link} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  info: {
    color: theme.palette.onSurface.mediumEmphasis,
  }
}));

export default function MainInfo() {
  const classes = useStyles();
  const userData = bl();

  if (!userData)
    return (
      <Grid container justify="center">
        <Grid item xs="6">
          <Button variant="contained" color="primary" component={Link} to="/login">
            <Box color="surface.light">Đăng nhập</Box>
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button variant="outlined" color="primary" component={Link} to="/register">Đăng ký</Button>
        </Grid>
      </Grid>
    )

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar alt={"Huỳnh Hữu Đức"}
                src={`https://yt3.ggpht.com/ytc/AAUvwngNYdyFVFpv4lmWF1piFUDHMHqVm5-yxDXUcpAV=s900-c-k-c0x00ffffff-no-rj`}
                className={classes.avatar}
        />
      </Grid>
      <Grid item>
        <Box pl={2}>
          <Box id="name">
            <Typography variant="h4" color="inherit">
              <Box fontSize={18}>Nguyễn Văn Hai Dụ</Box>
            </Typography>
          </Box>
          <Box pt={1} className={classes.info}>
            <Typography variant="h5" color="inherit">
              <Box fontSize={12}>0935123456</Box>
            </Typography>
            <Typography variant="h5" color="inherit">
              <Box fontSize={12}>taobanmaya@3que.com</Box>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}