import React from "react";
import {Box, Button, Divider, Grid, Paper, Typography} from "@material-ui/core";
import {CheckCircle, ChevronRight} from "@material-ui/icons";
import {currencyFormatter, dateFormatter} from "../../../../untils/formatter";
import Ribbon from "../../../common/Ribbon";
import {makeStyles} from "@material-ui/core/styles";
import orderConstant from "../../../../constants/orderConstant";
import {paymentConstant} from "../../../../constants/paymentConstant";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1.5),
  }
}));

const mapStatusIcon = (status) => {
  // switch (status){
  //   case "WAITING_DRIVER":
  //     return ;
  //   case "CHECKING":
  //     return;
  // }
  return CheckCircle;
}

export default function OrderHistoryItem({status, name, itemCount, date, cost, paymentType}) {
  const classes = useStyles();

  return (
    <Paper variant="outlined" className={classes.root}>
      <Box>
        <Ribbon>
          <Box p={1.5}>
            <Box>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <Box fontSize={20} color="secondary.main" component={mapStatusIcon(status)}/>
                </Grid>
                <Grid item>
                  <Typography variant="h4">
                    <Box fontSize={14} color="secondary.main">{orderConstant[status].name}</Box>
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
        <Divider variant="fullWidth"/>
        <Box>
          <Grid container>
            <Grid item xs hidden={status !== "DELIVERIED"}>
              <Button variant="text" fullWidth>
                <Box color="onSurface.disabled">Đánh giá</Box>
              </Button>
            </Grid>
            <Grid item>
              <Divider orientation="vertical"/>
            </Grid>
            <Grid item xs>
              <Button variant="text" color="primary" fullWidth>Đặt lại</Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}