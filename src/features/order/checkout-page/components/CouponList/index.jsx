import React from "react";

import CouponItem from "./CouponItem";
import HorizontalList from "../../../../common/HorizontalList";
import HorizontalListItem from "../../../../common/HorizontalList/HorizontalListItem";

const mockedData = [
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

export default function CouponList() {
  return (
    <HorizontalList cols={1.5} spacing={16}>
      {
        mockedData.map((data, index) => (
          <HorizontalListItem key={index}>
            <CouponItem {...data}/>
          </HorizontalListItem>
        ))
      }
    </HorizontalList>
  );
}