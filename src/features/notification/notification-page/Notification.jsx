import React from "react";
import {Box} from "@material-ui/core";
import TopNavigationBar from "../components/TopNavigationBar";
import BottomNavigationBar from "../../../components/BottomNavigationBar";

export default function Notifications(){
  return(
    <>
      <Box position="fix" top={0} left={0} right={0}>
        <TopNavigationBar/>
      </Box>
      <BottomNavigationBar initSate={1}/>
    </>
  );
}