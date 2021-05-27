import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {orderSelector, setNote} from "../../OrderSlice";

export default function NoteDialog({open, onClose}) {
  const {data: {note}} = useSelector(orderSelector);
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      setText(note);
    }
  }, [open]);

  const onSubmit = () => {
    dispatch(setNote(text));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ghi chú đơn hàng</DialogTitle>
      <DialogContent>
        <TextField value={text}
                   onChange={e => setText(`${e.target.value}`)}
                   onFocus={e => e.target.select()}
                   variant="outlined"
                   autoFocus
                   multiline
                   rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Hủy</Button>
        <Button color="primary" onClick={onSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}