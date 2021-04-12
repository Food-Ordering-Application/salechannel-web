import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import MainInfo from "../components/AccountPageComponents/MainInfo";

const useStyles = makeStyles(theme => ({
  root: {},
}));

export default function Account() {
  const classes = useStyles();
  return (
    <>
      <MainInfo/>
    </>
  )
}