import React, {useState} from "react";
import {Collapse, List, Typography} from "@material-ui/core";

import CategoryLabel from "../../../../components/CategoryLabel";
import StyledListItem from "./AccountActionList/StyledListItem";


export default function FAQsActionList({initOpen = false}) {
  const [open, setOpen] = useState(initOpen);

  return (
    <>
      <CategoryLabel open={open} onClick={() => setOpen(!open)}>
        <Typography variant="h4">FAQs</Typography>
      </CategoryLabel>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <StyledListItem label="Tôi quên mật khẩu đăng nhập"
                          to="/"
          />
          <StyledListItem label="Tại sao tôi không thay đổi được số diện thoại"
                          to="/"
          />
          <StyledListItem label="Tại sao tôi không thay đổi được email"
                          to="/"
          />
          <StyledListItem label="Tại sao tôi bị khóa tài khoản"
                          to="/"
          />
        </List>
      </Collapse>
    </>
  )
}