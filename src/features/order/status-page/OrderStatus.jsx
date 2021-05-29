import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import StatusCard from "./components/StatusCard/StatusCard";
import RiderInfo from "./components/RiderInfo";
import OrderDetails from "../checkout-page/components/OrderDetails";
import MoneyItem from "../checkout-page/components/OrderDetails/MoneyItem";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import BottomButton from "../../common/BottomButton";
import {useDispatch, useSelector} from "react-redux";
import {fetchOrderData, orderSelector} from "../OrderSlice";
import {useParams} from "react-router-dom";
import {paymentConstant} from "../../../constants/paymentConstant";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import orderConstant from "../../../constants/orderConstant";

const useStyles = makeStyles((theme) => ({
  helpBtn: {
    position: `fixed`,
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(0, 2, 2, 2)
  },
}));

export default function OrderStatus() {
  const classes = useStyles();
  const {id: orderId} = useParams();
  const dispatch = useDispatch();

  const {isFetching, isSuccess, isError, errorMessage, isEmpty, data} = useSelector(orderSelector);

  //=========================================

  // useEffect(function () {
  //   // Enable pusher logging - don't include this in production
  //   Pusher.logToConsole = true;
  //
  //   const pusher = new Pusher('29ff5ecb5e2501177186', {
  //     cluster: 'ap1'
  //   });
  //
  //   const channel = pusher.subscribe(`order_${orderId}`);
  //   channel.bind('order-status', function (data) {
  //     console.log(data);
  //     alert(JSON.stringify(data));
  //   });
  // }, []);


  //=========================================

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchOrderData({orderId}));
    }
  }, [orderId]);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
    }
  }, [isError]);

  const {paymentType, grandTotal, status} = data;

  return (
    <>
      <TopNavigationBar label="Trạng thái đơn hàng" isPending={isFetching}/>
      <Box my={6} p={2} hidden={isFetching || isEmpty}>
        <Box py={2}>
          <StatusCard statusText={orderConstant[status].name}
                      actionText={orderConstant[status].name}
                      step={orderConstant[status].step}
          />
        </Box>
        <Box pb={2}>
          <RiderInfo/>
        </Box>
        <Box pb={2}>
          <OrderDetails
            orderData={data}
            additionComponent={
              <>
                <Divider variant="fullWidth"/>
                <Box py={1.5}>
                  <MoneyItem label="Tổng cộng" value={grandTotal}/>
                </Box>
                <Box pb={1.5} fontWeight="bold">
                  <MoneyItem label="Thanh toán bằng" rightNode={
                    <Typography variant="h4">
                      <Box fontSize={12}>{paymentConstant[paymentType].name}</Box>
                    </Typography>
                  }/>
                </Box>
              </>
            }/>
        </Box>
        <Box py={3}>
          <OrderInfo/>
        </Box>
        <Box className={classes.helpBtn}>
          <BottomButton variant="outlined">
            Gọi trợ giúp?
          </BottomButton>
        </Box>
      </Box>
    </>
  );
}