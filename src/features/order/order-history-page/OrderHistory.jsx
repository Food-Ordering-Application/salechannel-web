import React, {useState} from "react";
import {Box, Tab, Tabs} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SwipeableViews from "react-swipeable-views";
import Draft from "./components/Draft";
import {OrderApi} from "../../../api/OrderApi";
import orderConstant from "../../../constants/orderConstant";

export default function OrderHistory() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box mt={12}>
      <TopNavigationBar label="Quản lí đơn hàng"
                        homeButton={false}
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
      />
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={(index) => setTabIndex(index)}
      >
        <Box p={2}>
          <Draft
            isActive={tabIndex === 0}
            fetchOrders={OrderApi.fetchOnOnGoing}
            orderStatus={orderConstant.CONFIRMED.code}
          />
        </Box>
        <Box p={2}>
          <Draft
            isActive={tabIndex === 1}
            fetchOrders={OrderApi.fetchHistory}
            orderStatus={orderConstant.COMPLETED.code}
          />
        </Box>
        <Box p={2}>
          <Draft
            isActive={tabIndex === 2}
            fetchOrders={OrderApi.fetchDraft}
            orderStatus={orderConstant.DRAFT.code}
          />
        </Box>
      </SwipeableViews>
    </Box>
  );
}