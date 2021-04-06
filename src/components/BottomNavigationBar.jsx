import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import StyledBadge from "./StyledBadge";
import StyledBottomNavigationAction from "./StyledBottomNavigationAction";
import LocationIcon from "../asserts/icons/Location";
import NotificationIcon from "../asserts/icons/Notification";
import SearchIcon from "../asserts/icons/Search";
import ShoppingBagIcon from "../asserts/icons/ShoppingBag";
import UserIcon from "../asserts/icons/User";

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

export default function BottomNavigationBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

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
        <StyledBottomNavigationAction label="Gần tôi"
                                      icon={<LocationIcon/>}/>
        <StyledBottomNavigationAction label="Thông báo"
                                      icon={
                                        <StyledBadge badgeContent={1} color='primary'>
                                          <NotificationIcon/>
                                        </StyledBadge>
                                      }/>
        <StyledBottomNavigationAction label="Khám phá"
                                      icon={<SearchIcon/>}/>
        <StyledBottomNavigationAction label="Giỏ hàng"
                                      icon={
                                        <StyledBadge badgeContent={1} color='primary'>
                                          <ShoppingBagIcon/>
                                        </StyledBadge>
                                      }/>
        <StyledBottomNavigationAction label="Tài khoản"
                                      icon={<UserIcon/>}/>
      </BottomNavigation>
    </div>
  );
}
