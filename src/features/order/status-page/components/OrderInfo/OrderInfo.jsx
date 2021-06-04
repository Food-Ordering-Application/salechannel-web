import React from "react";
import {Box} from "@material-ui/core";
import InfoItem from "./InfoItem";
import {useSelector} from "react-redux";
import {orderSelector} from "../../../OrderSlice";

export default function OrderInfo() {
  const {data: {id, delivery: {customerName, customerPhoneNumber, customerAddress}}} = useSelector(orderSelector);

  return (
    <Box px={1}>
      <Box py={0.5}>
        <InfoItem label="Mã đơn hàng" info={`SC-${String(id).split('-')[0]}`}/>
      </Box>
      <Box py={0.5}>
        <InfoItem label="Tên khách hàng" info={customerName}/>
      </Box>
      <Box py={0.5}>
        <InfoItem label="Số điện thoại" info={customerPhoneNumber}/>
      </Box>
      <Box py={0.5}>
        <InfoItem label="Địa chỉ" info={customerAddress}/>
      </Box>
    </Box>
  );
}