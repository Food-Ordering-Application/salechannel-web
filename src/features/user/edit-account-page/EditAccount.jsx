import React, {useEffect, useState} from "react";
import TopNavigationBar from "../../common/TopNavigationBar";
import {Avatar, Box, Divider} from "@material-ui/core";
import InfoItem from "./components/InfoItem";
import {useDispatch, useSelector} from "react-redux";
import {clearUserState, fetchUser, setAvatar, updateAvatar, userSelector} from "../UserSlice";
import {genderConstant} from "../../../constants/genderConstant";
import TipsItem from "./components/TipsItem";
import {
  EmailOutlined,
  PersonOutlineOutlined,
  VerifiedUserTwoTone,
  WarningOutlined,
  WarningTwoTone
} from "@material-ui/icons";
import InputDialog, {InputDialogType} from "./components/InputDialog";
import {showError} from "../../common/Snackbar/SnackbarSlice";
import {convertBase64} from "../../../helpers/file";

const AVATAR_TEMP_KEY = `_avatar`;

export default function EditAccount() {
  const dispatch = useDispatch();
  const {
    id: userId,
    isFetching,
    isError,
    errorMessage,
    phoneNumber,
    name,
    gender,
    avatar,
    email,
    isEmailVerified,
  } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const [inputType, setType] = useState(InputDialogType.username);
  const [initValue, setInitValue] = useState(name);

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    const tempImage = await convertBase64(e.target.files[0]);
    localStorage.setItem(AVATAR_TEMP_KEY, tempImage);
    dispatch(setAvatar(tempImage));
    dispatch(updateAvatar({file: e.target.files[0]}));
  }

  useEffect(() => {
    dispatch(fetchUser({userId}));
  }, []);

  useEffect(() => {
    if (isError) {
      dispatch(showError(errorMessage));
      dispatch(clearUserState());
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
          <TipsItem icon={WarningOutlined}
                    text={`Vui lòng xác nhận email`}
                    hidden={!email || isEmailVerified}
          />
        </Box>
        <Box p={2}>
          <form>
            <input id="file-input" type="file" accept="image/jpeg,image/png" hidden onChange={handleUpdateAvatar}/>
            <label htmlFor="file-input">
              <InfoItem leftNode={(<Avatar src={avatar}/>)}
                        actionLabel={`${avatar ? `Đổi` : `Thêm`} ảnh đại diện`}
                        isLoading={isFetching}
              />
            </label>
          </form>
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
                    appendInner={
                      email
                        ? isEmailVerified
                        ? <Box color="success.main" component={VerifiedUserTwoTone}/>
                        : <Box color="warning.main" component={WarningTwoTone}/>
                        : null
                    }
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