import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {removeCustomer} from "../../../redux/customer/customerSlice";


export default function LogoutButton() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.customer.user);
  const handleLogout = () => {
    dispatch(removeCustomer());
  }

  if (!user) return <></>;

  return (
    <Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>
      <Box flexGrow={1} textAlign="left">
        <Typography variant="h4" color="inherit">
          <Box fontSize={12}>Đăng xuất</Box>
        </Typography>
      </Box>
      <Box component={ExitToApp} fontSize={20}/>
    </Button>
  )
}