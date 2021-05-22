import React, {useEffect, useState} from "react";
import TopNavigationBar from "../../common/TopNavigationBar";
import {Avatar, Box, Divider} from "@material-ui/core";
import InfoItem from "./components/InfoItem";
import {useDispatch, useSelector} from "react-redux";
import {userSelector} from "../UserSlice";
import {genderConstant} from "../../../constants/genderConstant";
import TipsItem from "./components/TipsItem";
import {EmailOutlined, PersonOutlineOutlined} from "@material-ui/icons";
import InputDialog, {InputDialogType} from "./components/InputDialog";
import {showError} from "../../common/Snackbar/SnackbarSlice";

export default function EditAccount() {
  const dispatch = useDispatch();
  const {
    isFetching,
    isError,
    errorMessage,
    phoneNumber,
    name,
    gender,
    avatar,
    email,
  } = useSelector(userSelector);
  const [open, setOpen] = useState();
  const [inputType, setType] = useState(InputDialogType.username);
  const [initValue, setInitValue] = useState(name);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
    }
  }, [isError]);

  return (
    <>
      <Box mt={6}>
        <TopNavigationBar label="Thông tin tài khoản"/>
        <Box p={2}>
          <TipsItem icon={EmailOutlined}
                    text={`Nhập email để khôi phục mật khẩu khi cần và nhận các thông tin khuyến mãi`}
                    hidden={email}
          />
          <TipsItem icon={PersonOutlineOutlined}
                    text={`Nhập họ tên để giúp bác tài tiện liên hệ với bạn nha!`}
                    hidden={name}
          />
        </Box>
        <Box p={2}>
          <InfoItem leftNode={(<Avatar src={avatar}/>)}
                    actionLabel={`${avatar ? `Đổi` : `Thêm`} ảnh đại diện`}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.email);
                      setInitValue(email);
                      setOpen(true);
                    }}
          />
          <Divider/>
          <InfoItem label={`Họ tên`}
                    value={name}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.username);
                      setInitValue(name);
                      setOpen(true);
                    }}
          />
          <Divider/>
          <InfoItem label={`Số điện thoại`}
                    value={phoneNumber}
                    disabled
          />
          <Divider/>
          <InfoItem label={`Email`}
                    value={email}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.email);
                      setInitValue(email);
                      setOpen(true);
                    }}
          />
          <Divider/>
          <InfoItem label={`Giới tính`}
                    value={gender && genderConstant[gender].name}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.gender);
                      setInitValue(gender);
                      setOpen(true);
                    }}
          />
        </Box>
      </Box>
      <InputDialog open={open}
                   onClose={() => setOpen(false)}
                   initValue={initValue}
                   type={inputType}
      />
    </>
  );
}