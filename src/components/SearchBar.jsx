import React from "react";
import {IconButton, InputBase, makeStyles, Paper} from "@material-ui/core";
import {Search} from "@material-ui/icons";

const useStyle = makeStyles((theme) => ({
  root:{
    backgroundColor: theme.palette.surface.light,
    borderRadius: '16px',
    minHeight: '45px',
    display: 'flex',
    alignItems: 'center',
    boxShadow: '0px 4px 16px 0px rgb(0 0 0 / 6%)',
  },
  input:{
    fontFamily: theme.font.family,
    color: theme.palette.onSurface.disabled,
    letterSpacing: theme.font.letterSpacing,
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '14px',
    flex: 1,
    paddingLeft: '16px',
  },
  iconButton: {
    padding: 10,
  },
}));

export default function SearchBar() {
  const classes = useStyle();
  return (
    <>
      <Paper className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Tìm kiếm cửa hàng, món ăn..."
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <Search />
        </IconButton>
      </Paper>
    </>
  );
}