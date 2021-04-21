import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Avatar, Box, Grid, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
  },
  info: {
    color: theme.palette.onSurface.mediumEmphasis,
  }
}));

export default function MainInfo({avatar, name, phone, email}) {
  const classes = useStyles();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar alt={name}
                src={avatar}
                className={classes.avatar}
        />
      </Grid>
      <Grid item>
        <Box pl={2}>
          <Box id="name">
            <Typography variant="h4" color="inherit">
              <Box fontSize={18}>{name}</Box>
            </Typography>
          </Box>
          <Box pt={1} className={classes.info}>
            <Typography variant="h5" color="inherit">
              <Box fontSize={12}>{phone}</Box>
            </Typography>
            <Typography variant="h5" color="inherit">
              <Box fontSize={12}>{email}</Box>
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}