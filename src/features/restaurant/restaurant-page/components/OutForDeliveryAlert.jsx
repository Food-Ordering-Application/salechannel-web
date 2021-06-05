import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {useHistory} from "react-router-dom";

export default function OutForDeliveryAlert({open}) {
  const [isOpen, setOpen] = useState(false);
  const history = useHistory();

  const handleClose = () => {
    setOpen(false);
    history.goBack();
  }

  useEffect(() => {
    setOpen(open);
  }, [open]);

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Thông báo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Nhà hàng này quá xa vị trí hiện tại của bạn. Vui lòng chọn nhà hàng khác nha!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đã hiểu
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}