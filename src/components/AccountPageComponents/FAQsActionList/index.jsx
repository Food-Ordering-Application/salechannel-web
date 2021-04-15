import React, {useState} from "react";
import {Collapse, List, Typography} from "@material-ui/core";

import CategoryLabel from "../../CategoryLabel";
import StyledListItem from "../AccountActionList/StyledListItem";


export default function FAQsActionList() {
  const [open, setOpen] = useState(false);

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