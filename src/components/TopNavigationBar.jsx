import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ChevronLeft, Favorite, FavoriteBorder} from "@material-ui/icons";
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
      padding: theme.spacing(2),
    }),
  })
);

export default function TopNavigationBar({isFavorite, onFavoriteClick, onBack}) {
  const classes = useStyles({isFavorite});
  const history = useHistory()

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={onBack || (() => history.goBack())}>
        <ChevronLeft/>
      </IconButton>
      <div className={classes.favoriteContainer}>
        <IconButton className={classes.favoriteIcon} onClick={() => onFavoriteClick()}>
          {isFavorite ? <Favorite/> : <FavoriteBorder/>}
        </IconButton>
      </div>
    </div>
  );
}