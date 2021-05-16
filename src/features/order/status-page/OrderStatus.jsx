import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Divider} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import StatusCard from "./components/StatusCard/StatusCard";
import RiderInfo from "./components/RiderInfo";
import OrderDetails from "../checkout-page/components/OrderDetails";
import MoneyItem from "../checkout-page/components/OrderDetails/MoneyItem";
import OrderInfo from "./components/OrderInfo/OrderInfo";
import BottomButton from "../../common/BottomButton";
import {useSelector} from "react-redux";
import {orderSelector} from "../OrderSlice";

const useStyles = makeStyles((theme) => ({
  root: {},
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
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
  const {data} = useSelector(orderSelector);
  //TODO: display payment method
  return (
    <Box my={6} p={2}>
      <Box className={classes.topNavigator}>
        <TopNavigationBar label="Trạng thái đơn hàng"/>
      </Box>
      <Box py={2}>
        <StatusCard statusText="Đơn hàng đã được lấy"
                    actionText="Tài xế đang giao đồ ăn đến bạn"
        />
      </Box>
      <Box pb={2}>
        <RiderInfo/>
      </Box>
      <Box pb={2}>
        <OrderDetails orderData={data} additionComponent={
          <>
            <Divider variant="fullWidth"/>
            <Box py={1.5}>
              <MoneyItem label="Tổng cộng" value={58000}/>
            </Box>
            <Box pb={1.5} fontWeight="bold">
              <MoneyItem label="Thanh toán bằng" value={0}/>
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
  );
}