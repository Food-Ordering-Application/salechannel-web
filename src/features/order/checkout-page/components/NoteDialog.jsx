import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

export default function NoteDialog({open, note = '', onClose, onSubmit}) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (open) {
      setText(note);
    }
  }, open);

  const handleSubmit = () => {
    onSubmit(text);
    onClose();
  };

  const handleCancel = () => onClose();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ghi chú đơn hàng</DialogTitle>
      <DialogContent>
        <TextField value={text}
                   onChange={(e) => setText(`${e.target.value}`)}
                   variant="outlined"
                   autoFocus
                   multiline
                   rows={4}/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Hủy</Button>
        <Button color="primary" onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
}