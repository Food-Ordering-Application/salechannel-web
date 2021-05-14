import React from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import CouponItemLarge from "./components/CouponItemLarge";

const mockedData = [
  {
    code: `KHAO75`,
    description: `Giảm 75K cho đơn 200K`,
    expireAt: Date.now(),
  },
  {
    code: `KHAO50`,
    description: `Giảm 50K cho đơn 90K`,
    expireAt: Date.now(),
  },
  {
    code: `TRUMCUOI40`,
    description: `Giảm 40K đơn từ 60K`,
    expireAt: Date.now(),
  },
  {
    code: `BANMOI40`,
    description: `Giảm 40K | Đơn đầu tiên`,
    expireAt: Date.now(),
  },
  {
    code: `TRUMCUOI30`,
    description: `Giảm 30K đơn từ 40K`,
    expireAt: Date.now(),
  },
  {
    code: `FREESHIP15`,
    description: `Freeship Hồ Chí Minh`,
    expireAt: Date.now(),
  }
];

export default function Coupon() {

  return (
    <Box mt={6}>
      <TopNavigationBar label="Ví Coupon"/>
      <Box p={2}>
        {mockedData.map((coupon) => (
          <Box key={coupon.code} mb={2}>
            <CouponItemLarge {...coupon}/>
          </Box>
        ))}
      </Box>
    </Box>
  );
}