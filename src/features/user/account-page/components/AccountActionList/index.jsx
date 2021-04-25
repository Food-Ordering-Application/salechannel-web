import React, {useState} from "react";
import {Collapse, List, Typography} from "@material-ui/core";
import {AccountBalanceWalletOutlined, EditOutlined, LocationOnOutlined, ReceiptOutlined} from "@material-ui/icons";

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
                          to="/"
          />
          <StyledListItem label="Địa chỉ giao hàng"
                          icon={LocationOnOutlined}
                          to="/address"
          />
          <StyledListItem label="Lịch sử đơn hàng"
                          icon={ReceiptOutlined}
                          to="/"
          />
          <StyledListItem label="Ví"
                          icon={AccountBalanceWalletOutlined}
                          to="/"
          />
        </List>
      </Collapse>
    </>
  )
}