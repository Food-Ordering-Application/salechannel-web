import React from "react";
import {GridListTile, GridListTileBar, makeStyles} from "@material-ui/core";


const useStyle = makeStyles((theme) => ({
    root: {
      maxWidth: '140px',
      maxHeight: '140px',
      marginLeft: theme.spacing(1),
      '&:first-child': {
        marginLeft: theme.spacing(2),
      },
    },
    rootTile: {
      borderRadius: theme.spacing(2),
    },
    barRoot: {
      height: '40px',
      background: '#00000080',
    },
    barTitle: {
      fontSize: '10px',
      fontWeight: '600',
      lineHeight: '14px',
      maxHeight: '28px',
      textTransform: 'uppercase',
      whiteSpace: 'normal',
      color: theme.palette.surface.light,
      fontFamily: theme.font.family,
      letterSpacing: theme.font.letterSpacing,
    },
  })
);

export default function FavoriteItemMedium({key, image, title, onClick}) {
  const classes = useStyle();
  return (
    <GridListTile
      classes={{root: classes.root, tile: classes.rootTile}}
      key={key}
      onClick={onClick}>
      <img className={classes.image} src={image} alt={title}/>
      <GridListTileBar
        title={title}
        classes={{root: classes.barRoot, title: classes.barTitle}}
      />
    </GridListTile>
  );
}