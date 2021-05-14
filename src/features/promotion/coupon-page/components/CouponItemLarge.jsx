import React from "react";
import {Avatar, Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Ribbon from "../../../common/Ribbon";
import {Link} from "react-router-dom";
import {dateFormatter} from "../../../../untils/formatter";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    border: `solid 1px ${theme.palette.divider}`,
    borderLeft: `solid ${theme.spacing(1)}px ${theme.palette.primary.main}`,
  },
  leftFragment: {
    backgroundColor: "white",
    padding: theme.spacing(1.5),
  },
  name: {
    fontSize: theme.spacing(1.625),
    color: theme.palette.onSurface.highEmphasis,
  },
  date: {
    fontSize: theme.spacing(1.5),
    color: theme.palette.onSurface.disabled,
  },
  rightFragment: {
    height: "100%",
    padding: theme.spacing(0, 2),
    borderLeft: `dashed`,
    borderLeftWidth: `1px`,
    borderLeftColor: theme.palette.divider,
  },
  rightContainer: {
    position: `relative`,
    "&::before": {
      content: `""`,
      width: theme.spacing(1),
      height: theme.spacing(1),
      border: `solid 1px ${theme.palette.divider}`,
      borderRadius: `50%`,
      position: `absolute`,
      top: theme.spacing(-0.5),
      left: theme.spacing(-0.5625),
      backgroundColor: `white`,
      zIndex: 1,
      clipPath: `polygon(0 30%, 100% 30%, 100% 100%, 0 100%)`,
    },
    "&::after": {
      content: `""`,
      width: theme.spacing(1),
      height: theme.spacing(1),
      border: `solid 1px ${theme.palette.divider}`,
      borderRadius: `50%`,
      position: `absolute`,
      bottom: theme.spacing(-0.5),
      left: theme.spacing(-0.5625),
      backgroundColor: `white`,
      zIndex: 1,
      clipPath: `polygon(0 0, 100% 0, 100% 70%, 0 70%)`,
    }
  },
  rightText: {
    fontSize: theme.spacing(1.375),
    color: theme.palette.primary.main,
  }
}))

export default function CouponItemLarge({description, expireAt}) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Grid container alignItems="stretch">
        <Grid item xs>
          <Ribbon className={classes.leftFragment} component={Link} to="/coupon/123">
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Avatar src="https://www.opeca.it/wp-content/uploads/2021/03/5-350x350.jpg"/>
              </Grid>
              <Grid item xs>
                <Box>
                  <Typography variant="h4">
                    <Box className={classes.name}>{description}</Box>
                  </Typography>
                </Box>
                <Box mt={0.5}>
                  <Typography variant="h5">
                    <Box className={classes.date}>{`Hạn dùng: ${dateFormatter(expireAt)}`}</Box>
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Ribbon>
        </Grid>
        <Grid item className={classes.rightContainer}>
          <Ribbon className={classes.rightFragment}>
            <Typography variant="h4">
              <Box className={classes.rightText}>Dùng</Box>
            </Typography>
          </Ribbon>
        </Grid>
      </Grid>
    </Box>
  );
}