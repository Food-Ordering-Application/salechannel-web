import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import {ChevronLeft, FavoriteBorder} from "@material-ui/icons";
import SearchIcon from "../asserts/icons/Search";

const useStyles = makeStyles(theme => ({
    root: {},
    cover: {
      width: `100%`,
    },
    navigator: {
      width: `100%`,
      display: `flex`,
      flexDirection: `row`,
      alignItems: `center`,
      backgroundColor: `transparent`,
      position: `fixed`,
      top: 0,
      color: theme.palette.surface.light,
    },
    favoriteIcon: {
      display: `flex`,
      flexGrow: 1,
      justifyContent: `flex-end`,
    }
  })
);

const mockedData = {
  name: `Nhà hàng hải sản cá Trend - Nguyễn Văn Cừ`,
  cover: `https://images.foody.vn/res/g21/208155/prof/s576x330/foody-mobile-img_0954-jpg-344-635947742274439596.jpg`,
}

export default function Restaurant() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.navigator}>
        <ChevronLeft/>
        <div className={classes.favoriteIcon}>
          <FavoriteBorder/>
        </div>
        <SearchIcon/>
      </div>
      <img className={classes.cover} src={mockedData.cover} alt={mockedData.name}/>
      <Card></Card>
    </>
  );
}