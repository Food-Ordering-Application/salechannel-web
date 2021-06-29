import React, {useEffect, useState} from "react";
import {Box, Tab, Tabs} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SwipeableViews from "react-swipeable-views";
import Draft from "./components/Draft";
import {OrderApi} from "../../../api/OrderApi";
import {Autorenew, RefreshOutlined} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../../user/UserSlice";
import {useHistory} from "react-router-dom";
import {showInfo} from "../../common/Snackbar/SnackbarSlice";

export default function OrderHistory() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [tabIndex, setTabIndex] = useState(0);
  const [forceRefresh, setRefresh] = useState(false);
  const {isAuthenticated} = useSelector(userSelector)

  useEffect(() => {
    if (forceRefresh) {
      setRefresh(false);
    }
  }, [forceRefresh]);

  if (!isAuthenticated) {
    history.replace('/login', {ref: '/orders'})
    dispatch(showInfo(`Bạn cần đăng nhập để tiếp tục`))
    return null
  }

  return (
    <Box mt={12}>
      <TopNavigationBar
        label="Quản lí đơn hàng"
        bottomComponent={
          <>
            <Tabs
              value={tabIndex}
              onChange={(event, index) => setTabIndex(index)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              centered
            >
              <Tab label={`Đang đến`}/>
              <Tab label={`Lịch sử`}/>
              <Tab label={`Đơn nháp`}/>
            </Tabs>
          </>
        }
        rightIcon={RefreshOutlined}
        rightAction={() => setRefresh(true)}
      />
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={(index) => setTabIndex(index)}
      >
        <Box p={2}>
          <Draft
            isActive={tabIndex === 0}
            fetchOrders={OrderApi.fetchOnOnGoing}
            forceRefresh={forceRefresh}
            linkPattern={`/order/{orderId}`}
            draftName={`Đang xử lí`}
            draftIcon={Autorenew}
          />
        </Box>
        <Box p={2}>
          <Draft
            isActive={tabIndex === 1}
            fetchOrders={OrderApi.fetchHistory}
            forceRefresh={forceRefresh}
            linkPattern={`/order/{orderId}`}
            allowReview={true}
          />
        </Box>
        <Box p={2}>
          <Draft
            isActive={tabIndex === 2}
            fetchOrders={OrderApi.fetchDraft}
            forceRefresh={forceRefresh}
            linkPattern={`/store/{restaurantId}`}
          />
        </Box>
      </SwipeableViews>
    </Box>
  );
}