import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, GridListTile, Typography} from "@material-ui/core";
import RecommendIcon from "../asserts/icons/Recommend";

const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: '94px',
      maxHeight: '104px',
      margin: theme.spacing(0, 0, 1, 1),
      '&:first-child': {
        marginLeft: theme.spacing(2),
      },
      boxShadow: `0px 4px 4px 0px rgb(0 0 0 / 8%)`,
    },
    rootTile: {
      borderRadius: theme.spacing(0.5),
    },
    info: {
      position: `absolute`,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.palette.surface.light,
      display: `flex`,
      flexDirection: `column`,
      alignItems: `stretch`,
      height: `max-content`,
      padding: theme.spacing(0.5),
    },
    icon: {
      width: `11px`,
      height: `11px`,
    },
    nameRoot: {
      display: `flex`,
      direction: `row`,
    },
    nameLabel: {
      fontSize: `10px`,
      lineHeight: `11px`,
    },
    price: {
      fontSize: `9px`,
      lineHeight: `13px`,
      fontWeight: `normal`,
    },
  })
);

export default function RecommendedItemMedium({key, image, name, price, onClick}) {
  const classes = useStyles();

  return (
    <GridListTile
      classes={{root: classes.root, tile: classes.rootTile}}
      key={key}
      onClick={onClick}>
      <img className={classes.image} src={image} alt={name}/>
      <div className={classes.info}>
        <div className={classes.nameRoot}>
          <RecommendIcon className={classes.icon}/>
          <Typography variant="h4" align="left">
            <Box className={classes.nameLabel}>{name}</Box>
          </Typography>
        </div>
        <Typography variant="h4" align="right">
          <Box className={classes.price}>{price.toLocaleString()}đ</Box>
        </Typography>
      </div>
    </GridListTile>
  );
}