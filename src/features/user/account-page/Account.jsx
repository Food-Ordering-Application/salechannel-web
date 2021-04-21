import React from "react";
import {Box} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import MainInfo from "./components/MainInfo";
import AccountActionList from "./components/AccountActionList";
import FAQsActionList from "./components/FAQsActionList";
import LogoutButton from "./components/LogoutButton";
import {removeUser, userSelector} from "../UserSlice";
import UserAuthButtonGroup from "../login-page/components/UserAuthButtonGroup";


export default function Account() {
  const dispatch = useDispatch();
  const {isAuthenticated, phoneNumber, name, email, avatar} = useSelector(userSelector);

  return (
    <Box p={2}>
      <Box py={2}>
        {isAuthenticated ?
          <MainInfo name={name} email={email} avatar={avatar} phone={phoneNumber}/> :
          <UserAuthButtonGroup/>
        }
      </Box>
      <Box pt={2}>
        {isAuthenticated && <AccountActionList initOpen={true}/>}
      </Box>
      <Box pt={2}>
        <FAQsActionList initOpen={!isAuthenticated}/>
      </Box>
      <Box pt={5}>
        {isAuthenticated && <LogoutButton handleLogout={() => dispatch(removeUser())}/>}
      </Box>
    </Box>
  )
}