import React from "react";
import {Box, Button, Divider, Grid, Paper, Typography} from "@material-ui/core";
import {Autorenew, Cancel, CheckCircle, ChevronRight} from "@material-ui/icons";
import {currencyFormatter, dateFormatter} from "../../../../untils/formatter";
import Ribbon from "../../../common/Ribbon";
import {makeStyles} from "@material-ui/core/styles";
import orderConstant, {isCompleted, isDelivering} from "../../../../constants/orderConstant";
import {paymentConstant} from "../../../../constants/paymentConstant";
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => {

  return ({
    root: {
      borderRadius: theme.spacing(1.5),
    },
    statusIcon: ({status}) => ({
      fontSize: theme.spacing(2.5),
      color: theme.palette.status[status],
    }),
    statusText: ({status}) => ({
      fontSize: theme.spacing(2),
      color: theme.palette.status[status],
    }),
  });
});

const mapStatusIcon = (status) => {
  switch (status) {
    case orderConstant.DELIVERIED.code:
      return CheckCircle;
    case orderConstant.CANCELED.code:
      return Cancel;
  }
  return Autorenew;
};

export default function OrderHistoryItem({status, name, itemCount, date, cost, paymentType}) {
  const classes = useStyles({status});

  return (
    <Paper variant="outlined" className={classes.root}>
      <Box>
        <Ribbon component={Link} to="/orders/history/123">
          <Box p={1.5}>
            <Box>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Box className={classes.statusIcon} component={mapStatusIcon(status)}/>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    <Box className={classes.statusText}>{orderConstant[status].name}</Box>
                  </Typography>
                </Grid>
                <Grid item xs/>
                <Grid item>
                  <Typography variant="h5">
                    <Box fontSize={12} color="onSurface.mediumEmphasis">{dateFormatter(date)}</Box>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Box my={2}>
              <Grid container>
                <Grid item xs>
                  <Typography variant="h4">
                    <Box fontSize={16} color="onSurface.highEmphasis">{name}</Box>
                  </Typography>
                </Grid>
                <Grid item>
                  <Box fontSize={16} component={ChevronRight}/>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Typography variant="h5">
                <Box fontSize={12}
                     color="onSurface.mediumEmphasis">{`${currencyFormatter(cost)} (${paymentConstant[paymentType].name}) ● ${itemCount} món`}</Box>
              </Typography>
            </Box>
          </Box>
        </Ribbon>
        <Divider variant="fullWidth" hidden={isDelivering(status)}/>
        <Box>
          <Grid container>
            <Grid item xs hidden={!isCompleted(status)}>
              <Button variant="text" fullWidth>
                <Box color="onSurface.disabled">Đánh giá</Box>
              </Button>
            </Grid>
            <Grid item>
              <Divider orientation="vertical"/>
            </Grid>
            <Grid item xs hidden={isDelivering(status)}>
              <Button variant="text" color="primary" fullWidth>Đặt lại</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}