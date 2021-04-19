import React, {useEffect} from "react";
import {Box, LinearProgress} from "@material-ui/core";

import MainInfo from "../components/AccountPageComponents/MainInfo";
import AccountActionList from "../components/AccountPageComponents/AccountActionList";
import FAQsActionList from "../components/AccountPageComponents/FAQsActionList";
import LogoutButton from "../components/AccountPageComponents/LogoutButton";
import {useDispatch, useSelector} from "react-redux";
import {loginUser, userSelector} from "../features/user/UserSlice";
import UserAuthButtonGroup from "../features/user/login-page/components/UserAuthButtonGroup";


export default function Account() {
  const {phoneNumber, isFetching, isError} = useSelector(userSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginUser({phoneNumber: `0935123456`, password: `a`}));
  }, [dispatch]);

  useEffect(()=>{

  },[]);

  if (isFetching)
    return <LinearProgress/>;

  return (
    <Box p={2}>
      <Box py={2}>
        {isError ? <UserAuthButtonGroup/> : <MainInfo/>}
      </Box>
      <Box pt={2}><AccountActionList/></Box>
      <Box pt={2}><FAQsActionList/></Box>
      <Box pt={5}><LogoutButton/></Box>
    </Box>
  )
}