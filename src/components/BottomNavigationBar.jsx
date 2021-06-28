import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import StyledBottomNavigationAction from "./StyledBottomNavigationAction";
import SearchIcon from "../asserts/icons/Search";
import UserIcon from "../asserts/icons/User";
import {Link} from "react-router-dom";
import {FavoriteBorderOutlined, HomeOutlined, ReceiptOutlined} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    container: {
      width: `100%`,
      position: 'fixed',
      bottom: theme.spacing(1),
      display: `flex`,
      justifyContent: `center`,
    },
    root: {
      margin: theme.spacing(0, 2),
      padding: theme.spacing(0.75, 0),
      width: '100%',
      height: `max-content`,
      alignItems: 'center',
      borderRadius: theme.spacing(3),
      boxShadow: '0px 4px 16px 0px rgb(0 0 0 / 5%)',
    },
    item: {
      color: theme.palette.gray.l2,
    },
  })
);

export default function BottomNavigationBar({initSate}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(initSate || 0);

  return (
    <div className={classes.container}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={classes.root}
      >
        <StyledBottomNavigationAction label="Trang chủ"
                                      icon={<HomeOutlined/>}
                                      component={Link}
                                      to="/"
        />
        <StyledBottomNavigationAction label="Đơn hàng"
                                      component={Link}
                                      to="/orders"
                                      icon={
                                        <ReceiptOutlined/>
                                      }/>
        <StyledBottomNavigationAction label="Tìm kiếm"
                                      icon={<SearchIcon/>}
                                      component={Link}
                                      to="/search"
        />
        <StyledBottomNavigationAction label="Đã lưu"
                                      icon={<FavoriteBorderOutlined/>}
                                      component={Link}
                                      to="/store/favorite"
        />
        <StyledBottomNavigationAction label="Tài khoản"
                                      icon={<UserIcon/>}
                                      component={Link}
                                      to="/account"
        />
      </BottomNavigation>
    </div>
  );
}
