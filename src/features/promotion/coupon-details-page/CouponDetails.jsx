import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import TopNavigationBar from "../../common/TopNavigationBar";
import {useParams} from "react-router-dom";
import CouponInfoCard from "./components/CouponInfoCard";

const useStyles = makeStyles((theme) => ({
  topNavigator: {
    position: `fixed`,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  wallpaper: {
    width: `100%`,
    maxHeight: `250px`,
    objectFit: `cover`,
    objectPosition: `top`,
  },
  card: {
    transform: `translateY(-60px)`,
    margin: theme.spacing(0, 2),
    zIndex: 1,
  },
  descriptionItem: {
    marginTop: theme.spacing(3),
    "&::marker": {
      color: theme.palette.secondary.main,
    },
  },
  descriptionText: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.highEmphasis,
  },
}));

const mockedData = {
  code: `ZLPNEWT5T`,
  name: `ZaloPay khao 1 món 0Đ`,
  expirationDate: new Date(),
  description: [
    `Coupon có giá trị giảm 50.000đ áp dụng thanh toán qua ZaloPay.`,
    `Coupon áp dụng cho nhà hàng là ĐỐI TÁC CỦA SMARTFOOD (nhà hàng có dấu cam).`,
    `Coupon chỉ áp dụng cho khách hàng nhận được coupon.`,
    `Coupon chỉ được dung tối đa 1 lần.`,
    `Chương trình có thể thay đổi nội dung và kết thúc sớm hơn dự kiến theo chính sách công ty.`,
  ],
};

export default function CouponDetails() {
  const classes = useStyles();
  const {id} = useParams();

  console.log(`Coupon ID: ${id}`);

  return (
    <Box mt={6}>
      <Box className={classes.topNavigator}>
        <TopNavigationBar label="Coupon details"/>
      </Box>

      <img alt={mockedData.code} className={classes.wallpaper}
           src={"https://image.freepik.com/free-vector/chinese-envelope-with-paper-vouchers-winner-prize-illustration-asian-style_202497-77.jpg"}/>

      <Box className={classes.card}>
        <CouponInfoCard {...mockedData}/>
        <Box pt={2} pr={2}>
          <ul>
            {mockedData.description.map((text, index) => (
              <li key={index} className={classes.descriptionItem}>
                <Typography variant="body1">
                  <Box className={classes.descriptionText}>{text}</Box>
                </Typography>
              </li>)
            )}
          </ul>
        </Box>
      </Box>
    </Box>
  );
}