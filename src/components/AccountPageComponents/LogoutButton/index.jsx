import React from "react";
import {Box, Button, Typography} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
import {useHistory} from "react-router-dom";


export default function LogoutButton() {
  const history = useHistory();
  const handleLogout = () => {

    history.replace("/");
  }

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