import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export default function RestaurantClosedAlert({open}) {
  const history = useHistory();

  return (
    <Dialog open={open}>
      <DialogTitle>Thông báo</DialogTitle>
      <DialogContent>
        <DialogContentText>Quán đã đóng cửa</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => history.goBack()}>OK</Button>
      </DialogActions>
    </Dialog>
  );
}