import React from "react";
import {Link} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    color: theme.palette.primary.main,
  }
}));

export default function StyledLink(props) {
  const classes = useStyles();

  return (
    <Link className={classes.root} {...props}/>
  );
}