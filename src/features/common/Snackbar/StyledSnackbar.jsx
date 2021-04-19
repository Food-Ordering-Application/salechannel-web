import React from "react";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";

import {hideSnackbar, snackbarSelector} from "./SnackbarSlice";


export default function StyledSnackbar() {
  const {open, type, message} = useSelector(snackbarSelector);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === `clickaway`) return;
    dispatch(hideSnackbar());
  }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert elevation={6} variant="filled" onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
}