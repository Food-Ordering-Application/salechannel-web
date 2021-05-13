import React from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import OrderHistoryItem from "./components/OrderHistoryItem";

export default function OrderHistory() {

  return (
    <Box mt={8} mx={1.5}>
      <TopNavigationBar label="Đơn hàng của bạn"/>
      <OrderHistoryItem status="DELIVERIED"
                        name="Bún thịt nướng Kiều Bảo - Đề Thám"
                        date={new Date()}
                        itemCount={6}
                        cost={62000}
                        paymentType="COD"
      />
    </Box>
  );
}