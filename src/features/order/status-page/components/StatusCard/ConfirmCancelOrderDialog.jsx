import React from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@material-ui/core";

export default function ConfirmCancelOrderDialog({open, onClose, onConfirm}) {

  return (
    <Dialog open={open}>
      <DialogTitle>
        <Box mb={-2}>
          <Typography variant={`h4`}>
            Hủy đơn
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Typography variant={`body1`}>
          {/*Bạn có chắc muốn hủy đơn chứ?*/}
          Chức năng đang hoàn thiện
        </Typography>
      </DialogContent>
      <Box mb={2}/>
      <DialogActions>
        {/*<Button*/}
        {/*  onClick={() => onClose()}*/}
        {/*  children={`Giữ lại`}*/}
        {/*  color={`primary`}*/}
        {/*/>*/}
        {/*<Button*/}
        {/*  children={`Hủy đơn`}*/}
        {/*  color={`primary`}*/}
        {/*  onClick={() => {*/}
        {/*    onClose();*/}
        {/*    onConfirm();*/}
        {/*  }}*/}
        {/*/>*/}
        <Button
          children={`OK`}
          color={`primary`}
          onClick={() => {
            onClose();
            onConfirm();
          }}
        />
      </DialogActions>
    </Dialog>
  )
}