import React, {useEffect, useState} from "react";
import TopNavigationBar from "../../common/TopNavigationBar";
import {Avatar, Box, Divider} from "@material-ui/core";
import InfoItem from "./components/InfoItem";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, userSelector} from "../UserSlice";
import {getUserId} from "../../../helpers/header";
import {genderConstant} from "../../../constants/genderConstant";
import TipsItem from "./components/TipsItem";
import {EmailOutlined, PersonOutlineOutlined} from "@material-ui/icons";
import InputDialog, {InputDialogType} from "./components/InputDialog";

export default function EditAccount() {
  const dispatch = useDispatch();
  const {
    isFetching,
    isSuccess,
    phoneNumber,
    name,
    gender,
    avatar,
    email,
  } = useSelector(userSelector);
  const [open, setOpen] = useState();
  const [inputType, setType] = useState(InputDialogType.email);
  const [data, setData] = useState({name, avatar, email, gender});

  console.log(data);

  useEffect(() => {
    if (!isSuccess) {
      dispatch(fetchUser({userId: getUserId()}));
    }
  }, []);

  const handleInfoChange = (value) => {
    const newData = {...data};
    newData[inputType.code] = value;
    setData(newData);
  };

  return (
    <>
      <Box mt={6} hidden={isFetching}>
        <TopNavigationBar label="Thông tin tài khoản"/>
        <Box p={2}>
          <TipsItem icon={EmailOutlined}
                    text={`Nhập email để khôi phục mật khẩu khi cần và nhận các thông tin khuyến mãi`}
                    hidden={data.email}
          />
          <TipsItem icon={PersonOutlineOutlined}
                    text={`Nhập họ tên để giúp bác tài tiện liên hệ với bạn nha!`}
                    hidden={data.name}
          />
        </Box>
        <Box p={2}>
          <InfoItem leftNode={(<Avatar/>)}
                    actionLabel={`${avatar ? `Đổi` : `Thêm`} ảnh đại diện`}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.email);
                      setOpen(true);
                    }}
          />
          <Divider/>
          <InfoItem label={`Họ tên`}
                    value={data.name}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.username);
                      setOpen(true);
                    }}
          />
          <Divider/>
          <InfoItem label={`Số điện thoại`}
                    value={phoneNumber}
                    isLoading={isFetching}
                    disabled
          />
          <Divider/>
          <InfoItem label={`Email`}
                    value={data.email}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.email);
                      setOpen(true);
                    }}
          />
          <Divider/>
          <InfoItem label={`Giới tính`}
                    value={data.gender && genderConstant[data.gender].name}
                    isLoading={isFetching}
                    onClick={() => {
                      setType(InputDialogType.gender);
                      setOpen(true);
                    }}
          />
        </Box>
      </Box>
      <InputDialog open={open}
                   onClose={() => setOpen(false)}
                   type={inputType}
                   onSubmit={handleInfoChange}
      />
    </>
  );
}