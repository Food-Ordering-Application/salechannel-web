import React from "react";
import {Box} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";

import MainInfo from "./components/MainInfo";
import AccountActionList from "./components/AccountActionList";
import FAQsActionList from "./components/FAQsActionList";
import LogoutButton from "./components/LogoutButton";
import {removeUser, userSelector} from "../UserSlice";
import UserAuthButtonGroup from "../login-page/components/UserAuthButtonGroup";
import TopNavigationBar from "../../common/TopNavigationBar";
import {clearOrder} from "../../order/OrderSlice";
import {clearDefaultLocationData} from "../../home/LocationSlice";
import {useHistory} from "react-router-dom";
import {clearMetadata} from "../../home/MetadataSlice";


export default function Account() {
  const dispatch = useDispatch();
  const history = useHistory();
  const {isAuthenticated, phoneNumber, name, email, avatar} = useSelector(userSelector);

  const onLogout = () => {
    dispatch(removeUser());
    dispatch(clearOrder());
    dispatch(clearDefaultLocationData());
    dispatch(clearMetadata());
    history.replace('/');
  }

  return (
    <Box mt={8} mx={2}>
      <Box position="fixed" top={0} left={0} right={0}>
        <TopNavigationBar label="Tài khoản"/>
      </Box>
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
        {isAuthenticated && <LogoutButton handleLogout={onLogout}/>}
      </Box>
    </Box>
  )
}