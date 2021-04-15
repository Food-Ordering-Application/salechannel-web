import React from "react";
import {Box} from "@material-ui/core";

import MainInfo from "../components/AccountPageComponents/MainInfo";
import AccountActionList from "../components/AccountPageComponents/AccountActionList";
import FAQsActionList from "../components/AccountPageComponents/FAQsActionList";
import LogoutButton from "../components/AccountPageComponents/LogoutButton";


export default function Account() {

  return (
    <Box p={2}>
      <Box py={2}><MainInfo/></Box>
      <Box pt={2}><AccountActionList/></Box>
      <Box pt={2}><FAQsActionList/></Box>
      <Box pt={5}><LogoutButton/></Box>
    </Box>
  )
}