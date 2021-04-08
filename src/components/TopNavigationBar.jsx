import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ChevronLeft, Favorite, FavoriteBorder} from "@material-ui/icons";
import SearchIcon from "../asserts/icons/Search";
import {IconButton} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      display: `flex`,
      flexDirection: `row`,
      alignItems: `center`,
    },
    favoriteContainer: {
      display: `flex`,
      justifyContent: `flex-end`,
      flexGrow: 1,
    },
    button: {
      color: `inherit`,
      padding: theme.spacing(2),
    },
    favoriteIcon: ({isFavorite}) => ({
      color: isFavorite ? `red` : `inherit`,
      paddingRight: 0,
    }),
  })
);

export default function TopNavigationBar({isFavorite, onFavoriteClick}) {
  const classes = useStyles({isFavorite});
  const history = useHistory()

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={() => history.goBack()}>
        <ChevronLeft/>
      </IconButton>
      <div className={classes.favoriteContainer}>
        <IconButton className={classes.favoriteIcon} onClick={() => onFavoriteClick()}>
          {isFavorite ? <Favorite/> : <FavoriteBorder/>}
        </IconButton>
      </div>
      <IconButton className={classes.button}>
        <SearchIcon/>
      </IconButton>
    </div>
  );
}