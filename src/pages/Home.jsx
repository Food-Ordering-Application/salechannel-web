import React from "react";
import {makeStyles} from "@material-ui/core";

import AddressSelector from "../components/AddressSelector";
import FavoriteListHorizontal from "../components/FavoriteListHorizontal";
import SearchBar from "../components/SearchBar";
import Label from "../components/Label";
import CategoryListHorizontal from "../components/CategoryListHorizontal";
import BottomNavigationBar from "../components/BottomNavigationBar";
import RestaurantListVertical from "../components/RestaurantListVertical";

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
      paddingInline: theme.spacing(2),
    },
    categoryList: {
      padding: theme.spacing(1, 0, 2, 0),
    },
    restaurantList: {
      paddingInline: theme.spacing(2),
    }
  })
);

export default function Home() {
  const classes = useStyle();

  return (
    <>
      <AddressSelector address={"227 đường Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh, Việt Nam"}/>
      <div className={classes.content}>
        <div className={classes.favoriteRestaurants}>
          <FavoriteListHorizontal/>
        </div>
        <div className={classes.searchBar}>
          <SearchBar/>
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