import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from "@material-ui/core";
import {genderConstant} from "../../../../constants/genderConstant";

export const InputDialogType = {
  email: {
    code: `email`,
    type: `email`,
    title: `Nhập email của bạn`,
    placeholder: `Email`,
    validRegex: `^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`,
    errorEmpty: `Vui lòng nhập email`,
    errorInvalid: `Email không hợp lệ`
  },
  username: {
    code: `name`,
    type: `text`,
    title: `Nhập họ và tên`,
    placeholder: `Họ và tên`,
    validRegex: `[\\w]`,
    errorEmpty: `Vui lòng nhập họ tên`,
    errorInvalid: `Họ tên không hợp lệ`,
  },
  gender: {
    code: `gender`,
    type: `radio`,
    title: `Chọn giới tính`,
    placeholder: `Giới tính`,
    validRegex: `[\\w]`,
    errorEmpty: `Vui lòng chọn giới tính`,
    errorInvalid: `Giới tính không hợp lệ`
  },
  avatar: {
    code: `avatar`,
  }
}

const useStyles = makeStyles((theme) => ({
  root: {},
}));

function InputDialog({open, onClose, type, onSubmit}) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState(null);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(`${e.target.value}`);
  }
  const handleClose = () => {
    setValue(null);
    setError(false);
    setHelperText(null);
    onClose();
  }
  const alertError = (message) => {
    setError(true);
    setHelperText(message);
  }
  const handleSubmit = () => {
    if (value) {
      if (value.match(type.validRegex)) {
        onSubmit(value);
        handleClose();
      } else {
        alertError(type.errorInvalid);
      }
    } else {
      alertError(type.errorEmpty);
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle disableTypography>
        <Typography variant="h4">
          <Box textAlign="center" color="onSurface.highEmphasis">{type.title}</Box>
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormControl component="fieldset" error={error}>
          <Box hidden={type.type === `radio`}>
            <TextField variant="outlined"
                       type={type.type}
                       error={error}
                       onChange={handleChange}
                       placeholder={type.placeholder}/>
          </Box>
          <Box hidden={type.type !== `radio`}>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
              {Object.keys(genderConstant).map((key) => (
                <FormControlLabel control={<Radio/>}
                                  value={genderConstant[key].code}
                                  label={genderConstant[key].name}/>
              ))}
            </RadioGroup>
          </Box>
          <FormHelperText>
            <Typography variant="h4" color="inherit">
              <Box fontSize={12}>{helperText}</Box>
            </Typography>
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button color="primary" onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  )
}

export default InputDialog;