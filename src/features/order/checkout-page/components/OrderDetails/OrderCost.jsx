import React from "react";
import {Box} from "@material-ui/core";
import MoneyItem from "./MoneyItem";

export default function OrderCost({subtotal, distance, deliveryFees}) {
  return (
    <Box>
      <Box pb={1.5}>
        <MoneyItem label="Tổng đơn" value={subtotal}/>
      </Box>
      <Box>
        <MoneyItem label={`Phí vận chuyển (${distance} km)`} value={deliveryFees}/>
      </Box>
    </Box>
  );
}