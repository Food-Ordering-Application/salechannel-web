import React, {useState} from "react";
import {Box, Divider, Tab, Tabs} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import SwipeableViews from "react-swipeable-views";
import OnGoing from "./components/OnGoing";
import History from "./components/History";
import Draft from "./components/Draft";

// const mockedData = [
//   {
//     status: "DELIVERING",
//     name: "Bún thịt nướng Bảo Ngọc",
//     date: new Date(),
//     itemCount: 6,
//     cost: 57000,
//     payem: "COD"
//   },
//   {
//     status: "DELIVERIED",
//     name: "Cơm gà xối mỡ 365 - Vườn Chuối",
//     date: new Date(),
//     itemCount: 4,
//     cost: 57000,
//     paymentType: "COD"
//   },
//   {
//     status: "CANCELED",
//     name: "Bún thịt nướng Kiều Bảo - Đề Thám",
//     date: new Date(),
//     itemCount: 6,
//     cost: 62000,
//     paymentType: "COD"
//   },
// ];


export default function OrderHistory() {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <Box mt={6}>
      {/*{mockedData.map((data, index) => (*/}
      {/*  <Box mb={2} key={index}>*/}
      {/*    <OrderHistoryItem {...data}/>*/}
      {/*  </Box>*/}
      {/*))}*/}
      <TopNavigationBar label="Quản lí đơn hàng" backButton={false} homeButton={false}/>
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
      <Divider variant="fullWidth" light/>
      <SwipeableViews
        index={tabIndex}
        onChangeIndex={(index) => setTabIndex(index)}
      >
        <Box p={2}>
          <OnGoing/>
        </Box>
        <Box p={2}>
          <History/>
        </Box>
        <Box p={2}>
          <Draft/>
        </Box>
      </SwipeableViews>
    </Box>
  );
}