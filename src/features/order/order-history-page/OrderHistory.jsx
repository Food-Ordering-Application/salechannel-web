import React from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import OrderHistoryItem from "./components/OrderHistoryItem";

const mockedData = [
  {
    status: "DELIVERING",
    name: "Bún thịt nướng Bảo Ngọc",
    date: new Date(),
    itemCount: 6,
    cost: 57000,
    paymentType: "COD"
  },
  {
    status: "DELIVERIED",
    name: "Cơm gà xối mỡ 365 - Vườn Chuối",
    date: new Date(),
    itemCount: 4,
    cost: 57000,
    paymentType: "COD"
  },
  {
    status: "CANCELED",
    name: "Bún thịt nướng Kiều Bảo - Đề Thám",
    date: new Date(),
    itemCount: 6,
    cost: 62000,
    paymentType: "COD"
  },
];

export default function OrderHistory() {

  return (
    <Box mt={8} mx={1.5}>
      <TopNavigationBar label="Đơn hàng của bạn"/>
      {mockedData.map((data, index) => (
        <Box mb={2} key={index}>
          <OrderHistoryItem {...data}/>
        </Box>
      ))}
    </Box>
  );
}