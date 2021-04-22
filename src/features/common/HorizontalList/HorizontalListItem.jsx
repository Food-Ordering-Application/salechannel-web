import React from "react";
import {GridListTile, withStyles} from "@material-ui/core";

const HorizontalListItem = withStyles(theme => ({
  root: {
    height: `max-content`,
    '&:first-child': {
      marginLeft: theme.spacing(2),
    },
    '&:last-child': {
      marginRight: theme.spacing(2),
    },
  },
  tile: {
    height: `max-content`,
  },
}))(GridListTile);

export default HorizontalListItem;