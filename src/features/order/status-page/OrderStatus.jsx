import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Chip, Divider, Grid, Typography} from "@material-ui/core";
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
import {ChevronRight, Print} from "@material-ui/icons";
import {shortTimeFormatter} from "../../../untils/formatter";
import Ribbon from "../../common/Ribbon";

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
    padding: theme.spacing(2, 0),
    boxShadow: theme.effect.dp10.boxShadow,
    textAlign: "center",
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
      console.log(_data)
      if (_data.delivery?.driverId && !data?.driverInfo) {
        DriverApi
          .getDriverInfo(_data.delivery.driverId)
          .then((info) => {
            dispatch(updateOrderStatus({..._data, ...info}))
          })
          .catch((e) => console.log(e))
      } else {
        dispatch(updateOrderStatus(_data));
      }
      if (_data.delivery?.status === orderConstant.COMPLETED.code) {
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
        <TopNavigationBar label="Trạng thái đơn hàng" isPending={true}/>
      </>
    )
  }

  const {
    subTotal,
    createdAt,
    updatedAt,
    driverInfo,
    restaurantId,
    invoice,
    delivery: {restaurantName, restaurantAddress, shippingFee, status, driverId, deliveredAt}
  } = data;

  return (
    <>
      <TopNavigationBar label="Trạng thái đơn hàng" isPending={isRequesting}/>
      {isSuccess && <Box my={6} p={2}>
        <Box py={2}>
          {status === orderConstant.COMPLETED.code ? (
            <Box className={classes.successCard}>
              <Ribbon onClick={() => history.replace(`/store/${restaurantId}`)}>
                <Box pl={2}>
                  <Grid container justify="center" alignItems="flex-end">
                    <Grid item xs>
                      <Typography variant={"h4"}>
                        <Box fontSize={16} color={`onSurface.highEmphasis`} textAlign="center">{restaurantName}</Box>
                      </Typography>
                    </Grid>
                    <Grid item>
                      <ChevronRight style={{fontSize: 16}}/>
                    </Grid>
                  </Grid>
                </Box>
                <Typography variant={"h5"}>
                  <Box pb={1} fontSize={12} color={`onSurface.mediumEmphasis`}
                       textAlign="center">{restaurantAddress}</Box>
                </Typography>
              </Ribbon>
              <Divider variant="fullWidth" light/>
              <Typography variant={"h4"}>
                <Box pt={1} color={"status.COMPLETED"} fontSize={15}>Giao hàng thành công</Box>
              </Typography>
              <Box mt={1} mb={2} textAlign={"center"}>
                <Grid container>
                  <Grid item xs>
                    <Typography variant={"h5"}>
                      <Box fontSize={12} fontWeight={600}>Đặt lúc</Box>
                      <Box fontSize={12} color={`onSurface.mediumEmphasis`}>
                        {shortTimeFormatter(createdAt)}
                      </Box>
                    </Typography>
                  </Grid>
                  <Grid item xs>
                    <Typography variant={"h5"}>
                      <Box fontSize={12} fontWeight={600}>Giao lúc</Box>
                      <Box fontSize={12} color={`onSurface.mediumEmphasis`}>
                        {shortTimeFormatter(deliveredAt || updatedAt)}
                      </Box>
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <Chip
                    icon={<Print/>}
                    label="Xuất hóa đơn"
                    variant="outlined"
                    size="small"
                    onClick={() => {
                      window.open(
                        `${process.env.REACT_APP_PRODUCTION_API}/order/${orderId}/invoice`,
                        `_blank`
                      )
                      return null
                    }}
                  />
                </Grid>
              </Grid>
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
                      <Box fontSize={12}>{paymentConstant[invoice.payment?.method || `PAYPAL`].name}</Box>
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