import React from "react";
import {Box} from "@material-ui/core";
import InfoItem from "./InfoItem";

export default function OrderInfo() {
  return (
    <Box px={1}>
      <Box py={0.5}>
        <InfoItem label="Mã đơn hàng" info="bake-123"/>
      </Box>
      <Box py={0.5}>
        <InfoItem label="Tên khách hàng" info="Admin"/>
      </Box>
      <Box py={0.5}>
        <InfoItem label="Số điện thoại" info="0935123456"/>
      </Box>
      <Box py={0.5}>
        <InfoItem label="Địa chỉ" info="227 Nguyễn Văn Cừ, phường 4, quận 5, TP.HCM"/>
      </Box>
    </Box>
  );
}