import React, {useState} from "react";
import {Collapse, List, Typography} from "@material-ui/core";
import {EditOutlined, FavoriteBorder, LocationOnOutlined, ReceiptOutlined} from "@material-ui/icons";

import CategoryLabel from "../../../../../components/CategoryLabel";
import StyledListItem from "./StyledListItem";


export default function AccountActionList({initOpen}) {
  const [open, setOpen] = useState(initOpen || false);

  return (
    <>
      <CategoryLabel open={open} onClick={() => setOpen(!open)}>
        <Typography variant="h4">Tài khoản</Typography>
      </CategoryLabel>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <StyledListItem label="Thông tin tài khoản"
                          icon={EditOutlined}
                          to="/account/edit"
          />
          <StyledListItem label="Địa chỉ giao hàng"
                          icon={LocationOnOutlined}
                          to="/address"
          />
          <StyledListItem label="Nhà hàng yêu thích"
                          icon={FavoriteBorder}
                          to="/store/favorite"
          />
          <StyledListItem label="Lịch sử đơn hàng"
                          icon={ReceiptOutlined}
                          to="/orders"
          />
          {/*<StyledListItem label="Ví coupon"*/}
          {/*                icon={AccountBalanceWalletOutlined}*/}
          {/*                to="/coupons"*/}
          {/*/>*/}
        </List>
      </Collapse>
    </>
  )
}