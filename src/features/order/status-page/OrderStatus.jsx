import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider, Grid, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import StatusCard from "./components/StatusCard/StatusCard";
import RiderInfo from "./components/RiderInfo";
import OrderDetails from "../checkout-page/components/OrderDetails";
import MoneyItem from "../checkout-page/components/OrderDetails/MoneyItem";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import BottomButton from "../../common/BottomButton";
import {useDispatch, useSelector} from "react-redux";
import {clearOrderState, fetchOrderData, orderSelector, updateOrderStatus} from "../OrderSlice";
import {useHistory, useParams} from "react-router-dom";
import {paymentConstant} from "../../../constants/paymentConstant";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import orderConstant from "../../../constants/orderConstant";
import Pusher from "pusher-js";
import {DriverApi} from "../../../api/RiderApi";
import {CheckCircleTwoTone} from "@material-ui/icons";
import {datetimeFormatter} from "../../../untils/formatter";

const useStyles = makeStyles((theme) => ({
  helpBtn: {
    position: `fixed`,
    bottom: 0,
    left: 0,
    right: 0,
    padding: theme.spacing(0, 2, 2, 2)
  },
  successCard: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp10.boxShadow,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  }
}));

export default function OrderStatus() {
  const classes = useStyles();
  const {id: orderId} = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const {isRequesting, isSuccess, isError, errorMessage, data} = useSelector(orderSelector);

  useEffect(function () {
    Pusher.log = (msg) => {
      console.log("[Pusher]", msg);
    };

    const pusher = new Pusher('29ff5ecb5e2501177186', {
      cluster: 'ap1'
    });

    const channel = pusher.subscribe(`order_${orderId}`);
    channel.bind('order-status', function (_data) {
      if (_data?.driverId) {
        DriverApi
          .getDriverLocation(_data.driverId)
          .then((info) => {
            dispatch(updateOrderStatus({...data, ...info}))
          })
          .catch((e) => console.log(e))
      } else {
        dispatch(updateOrderStatus(data));
      }
      if (_data.deliver?.status === orderConstant.COMPLETED.code) {
        history.push(`/order/${orderId}/review`, {step: 1})
      }
    });
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

  if (!isSuccess) {
    return (
      <>
        <TopNavigationBar label="Trạng thái đơn hàng" isPending={isRequesting}/>
      </>
    )
  }

  const {paymentType, subTotal, updatedAt, driverInfo, delivery: {shippingFee, status, driverId}} = data;

  return (
    <>
      <TopNavigationBar label="Trạng thái đơn hàng" isPending={isRequesting}/>
      {isSuccess && <Box my={6} p={2}>
        <Box py={2}>
          {status === orderConstant.COMPLETED.code ? (
            <Box className={classes.successCard}>
              <Grid container justify={"center"} alignItems={"center"}>
                <Grid item>
                  <Box color={"status.COMPLETED"} component={CheckCircleTwoTone}/>
                </Grid>
                <Grid item>
                  <Box p={2}>
                    <Typography variant={"h4"}>
                      <Box fontSize={16}>Giao hàng thành công</Box>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
              <Box textAlign={"center"}>
                <Typography variant={"h5"}>
                  <Box fontSize={12} color={`disabled`}>{datetimeFormatter(new Date(updatedAt))}</Box>
                </Typography>
              </Box>
            </Box>
          ) : (
            <StatusCard statusText={''}
                        actionText={orderConstant[status.trim()].description}
                        step={orderConstant[status.trim()].step}
                        onCancel={() => {
                          console.log(`Cancel order`)
                        }}
            />
          )}
        </Box>
        {(status === orderConstant.ON_GOING.code || status === orderConstant.PICKED_UP.code) && driverId && driverInfo && (
          <Box pb={2}>
            <RiderInfo
              id={driverId}
              orderId={orderId}
              avatar={driverInfo.avatar}
              name={driverInfo?.name}
              licensePlate={driverInfo?.licensePlate}
            />
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
        <Box className={classes.helpBtn} hidden={status === orderConstant.COMPLETED.code}>
          <BottomButton variant="outlined">
            Gọi trợ giúp?
          </BottomButton>
        </Box>
      </Box>
      }
    </>
  );
}