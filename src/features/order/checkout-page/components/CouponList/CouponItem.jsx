import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: `relative`,
    borderLeftColor: theme.palette.primary.main,
    borderLeftWidth: theme.spacing(1),
    borderRadius: theme.spacing(1, 0, 0, 1),
    margin: 0,
    padding: theme.spacing(1),
    '&::before': {
      content: `""`,
      display: `block`,
      position: `absolute`,
      top: theme.spacing(-0.75),
      left: `calc(75% - ${theme.spacing(0.5)}px)`,
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: `50%`,
      borderWidth: `1px`,
      borderStyle: `solid`,
      borderColor: theme.palette.divider,
      zIndex: 20,
      backgroundColor: `white`,
    },
    '&::after': {
      content: `""`,
      display: `block`,
      position: `absolute`,
      bottom: theme.spacing(-0.75),
      left: `calc(75% - ${theme.spacing(0.5)}px)`,
      width: theme.spacing(1),
      height: theme.spacing(1),
      borderRadius: `50%`,
      borderWidth: `1px`,
      borderStyle: `solid`,
      borderColor: theme.palette.divider,
      zIndex: 20,
      backgroundColor: `white`,
    }
  },
  code: {
    fontSize: theme.spacing(1.25),
    textTransform: `uppercase`,
    color: theme.palette.onSurface.mediumEmphasis,
  },
  description: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.highEmphasis,
  },
  expireDate: {
    fontSize: theme.spacing(1.25),
    color: theme.palette.onSurface.mediumEmphasis,
  },
  ticket: {
    width: `650px`,
    height: `320px`,
    margin: `100px auto`,
    position: `relative`,
    transition: `all 300ms cubic-bezier(0.03, 0.98, 0.53, 0.99) 0s`,
    background: `blue`,
    borderRadius: `20px`,
    padding: `5px`,
  },
  ticketContentWrapper: {},
  button: {
    margin: `auto`,
    fontSize: theme.spacing(1.25),
    color: theme.palette.primary.main,
  }
}));

export default function CouponItem({code, description, expireAt, handleShowDetails, handleApply}) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs={9}>
          <Box>
            <Typography variant="h5">
              <Box className={classes.code}>{code}</Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4">
              <Box className={classes.description}>{description}</Box>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5">
              <Box className={classes.expireDate}>{`EXP: ${new Date(expireAt).toDateString()}`}</Box>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={3} alignSelf="center">
            <Button variant="text" fullWidth>
              <Typography variant="h5">
                <Box className={classes.button}>Dùng</Box>
              </Typography>
            </Button>
        </Grid>
      </Grid>
    </Paper>

  );
}