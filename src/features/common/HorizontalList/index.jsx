import React from "react";
import {GridList} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: `transparent`,
  },
  list: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
  }
}));

export default function HorizontalList({children, cols, spacing}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList className={classes.list} cellHeight="auto" cols={cols} spacing={spacing}>
        {children}
      </GridList>
    </div>
  );
}