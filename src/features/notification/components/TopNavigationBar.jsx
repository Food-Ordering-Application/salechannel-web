import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {Box, IconButton, Typography} from "@material-ui/core";
import {Check, ChevronLeft} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
      display: `flex`,
      flexDirection: `row`,
      alignItems: `center`,
    },
    favoriteContainer: {
      display: `flex`,
      justifyContent: `center`,
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

export default function TopNavigationBar({isFavorite}) {
  const classes = useStyles({isFavorite});
  const history = useHistory();

  return (
    <div className={classes.root}>
      <IconButton className={classes.button} onClick={() => history.goBack()}>
        <ChevronLeft/>
      </IconButton>
      <div className={classes.favoriteContainer}>
        <Typography variant="h2">
          <Box fontSize={15} color="black">
            Thông báo
          </Box>
        </Typography>
      </div>
      <IconButton className={classes.button}>
        <Check/>
      </IconButton>
    </div>
  );
}