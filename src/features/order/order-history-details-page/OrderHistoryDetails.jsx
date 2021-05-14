import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Button, Grid, Typography} from "@material-ui/core";
import {useParams} from "react-router-dom";
import TopNavigationBar from "../../common/TopNavigationBar";
import BottomAction from "../../common/BottomAction";
import OrderInfo from "../status-page/components/OrderInfo/OrderInfo";

const useStyles = makeStyles((theme) => ({
  name: {
    textAlign: `center`,
    fontSize: theme.spacing(3.5),
    padding: theme.spacing(0, 2)
  },
  dateTime: {
    textAlign: `center`,
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.disabled,
  }
}));

export default function OrderHistoryDetails() {
  const classes = useStyles();
  const {id} = useParams();

  console.log(id);

  return (
    <Box my={6}>
      <TopNavigationBar label="Chi tiết đơn hàng"/>
      <Box py={2}>
        <Box>
          <Typography variant="h4">
            <Box className={classes.name}>Bún thịt nướng Kiều Bảo - Đề thám</Box>
          </Typography>
        </Box>
        <Box mt={0.5}>
          <Typography variant="h5">
            <Box className={classes.dateTime}>13/05/2021 12:04</Box>
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box>Fetching data to show more...</Box>
        {/*<Box pb={2}>*/}
        {/*  <OrderDetails additionComponent={*/}
        {/*    <>*/}
        {/*      <Divider variant="fullWidth"/>*/}
        {/*      <Box py={1.5}>*/}
        {/*        <MoneyItem label="Tổng cộng" value={58000}/>*/}
        {/*      </Box>*/}
        {/*      <Box pb={1.5} fontWeight="bold">*/}
        {/*        <MoneyItem label="Thanh toán bằng" value={0}/>*/}
        {/*      </Box>*/}
        {/*    </>*/}
        {/*  }/>*/}
        {/*</Box>*/}
        <Box p={2}>
          <OrderInfo/>
        </Box>
      </Box>
      <BottomAction padding={2}>
        <Grid container spacing={2}>
          <Grid item xs>
            <Button variant="outlined" color="primary" fullWidth>Đánh giá</Button>
          </Grid>
          <Grid item xs>
            <Button variant="contained" color="primary" fullWidth>Đặt lại</Button>
          </Grid>
        </Grid>
      </BottomAction>
    </Box>
  );
}