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
import {clearOrderState, fetchOrderData, orderSelector, updateDriverLocation, updateOrderStatus} from "../OrderSlice";
import {useHistory, useParams} from "react-router-dom";
import {paymentConstant} from "../../../constants/paymentConstant";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import orderConstant from "../../../constants/orderConstant";
import Pusher from "pusher-js";

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
  const history = useHistory();

  const {isRequesting, isSuccess, isError, errorMessage, data} = useSelector(orderSelector);

  //=========================================

  useEffect(function () {
    Pusher.log = (msg) => {
      console.log("[Pusher]", msg);
    };

    const pusher = new Pusher('29ff5ecb5e2501177186', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe(`order_${orderId}`);
    channel.bind('order-status', function (data) {
      dispatch(updateOrderStatus(data));
    });
    channel.bind("delivery-location", function (data) {
      console.log(data, '<==delivery change')
      dispatch(updateDriverLocation(data))
    })
  }, []);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchOrderData({orderId}));
    }
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearOrderState());
      history.replace('/search');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess) {
      const {delivery: {status: deliveryStatus}} = data;
      if (deliveryStatus === orderConstant.COMPLETED.code)
        history.replace(`/order/${orderId}/review`)
    }
  }, [data])

  if (!isSuccess) {
    return (
      <>
        <TopNavigationBar label="Trạng thái đơn hàng" isPending={isRequesting}/>
      </>
    )
  }

  const {paymentType, subTotal, delivery: {shippingFee, status}} = data;

  return (
    <>
      <TopNavigationBar label="Trạng thái đơn hàng" isPending={isRequesting}/>
      {isSuccess && <Box my={6} p={2}>
        <Box py={2}>
          <StatusCard statusText={''}
                      actionText={orderConstant[status.trim()].description}
                      step={orderConstant[status.trim()].step}
                      onCancel={() => {
                        console.log(`Cancel order`)
                      }}
          />
        </Box>
        {(status !== `DRAFT` && status !== `ASSIGNING_DRIVER`) && (
          <Box pb={2}>
            <RiderInfo link={`/order/${orderId}/location`}/>
          </Box>
        )}
        <Box pb={2}>
          <OrderDetails
            orderData={data}
            isEditable={false}
            additionComponent={
              <>
                <Divider variant="fullWidth"/>
                <Box py={1.5}>
                  <MoneyItem label="Tổng cộng" value={subTotal + shippingFee}/>
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
      }
    </>
  );
}