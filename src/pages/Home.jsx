import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core";

import AddressSelector from "../components/AddressSelector";
import FavoriteListHorizontal from "../components/FavoriteListHorizontal";
import SearchBar from "../components/SearchBar";
import Label from "../components/Label";
import CategoryListHorizontal from "../components/CategoryListHorizontal";
import BottomNavigationBar from "../components/BottomNavigationBar";
import RestaurantListVertical from "../components/RestaurantListVertical";
import {useDispatch, useSelector} from "react-redux";
import {locationSelector} from "../features/home/LocationSlice";
import {Link, useHistory, useLocation} from "react-router-dom";
import Ribbon from "../features/common/Ribbon";

const useStyle = makeStyles((theme) => ({
    content: {
      padding: theme.spacing(5, 0, 8, 0),
    },
    favoriteRestaurants: {
      paddingTop: theme.spacing(2),
      backgroundColor: 'transparent',
    },
    searchBar: {
      padding: theme.spacing(2),
    },
    label: {
      padding: theme.spacing(0, 2),
    },
    categoryList: {
      padding: theme.spacing(1, 0, 2, 0),
    },
    restaurantList: {
      padding: theme.spacing(0, 2),
    }
  })
);

export default function Home() {
  const classes = useStyle();

  //Hook
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  //Global State
  const {isSuccess: locationReady, address} = useSelector(locationSelector);

  //Effects
  useEffect(() => {
    if (!locationReady) {
      history.replace({
        pathname: `/location/analyse`,
        state: {ref: location.pathname}
      });
    }
  }, [locationReady]);

  return (
    <>
      <AddressSelector address={address}/>
      <div className={classes.content}>
        <div className={classes.favoriteRestaurants}>
          <FavoriteListHorizontal/>
        </div>
        <div className={classes.searchBar}>
          <Ribbon component={Link} to={'/search'}>
            <SearchBar/>
          </Ribbon>
        </div>
        <div className={classes.label}>
          <Label uppercase>20 nhà hàng gần bạn</Label>
        </div>
        <div className={classes.categoryList}>
          <CategoryListHorizontal/>
        </div>
        <div className={classes.restaurantList}>
          <RestaurantListVertical/>
        </div>
      </div>
      <BottomNavigationBar/>
    </>
  );
}