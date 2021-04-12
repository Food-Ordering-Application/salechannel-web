import React from "react";
import {Card, CardContent, CardMedia, Divider, makeStyles, Typography} from "@material-ui/core";
import {AvTimer, CreditCard, Star} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '82px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    minWidth: '82px',
    borderRadius: '4px',
  },
  name: {
    color: theme.palette.onSurface.default,
    fontFamily: theme.font.family,
    letterSpacing: theme.font.letterSpacing,
    fontWeight: 600,
    fontSize: '11px',
    lineHeight: '16px',
  },
  info: {
    color: theme.palette.onSurface.disabled,
    fontFamily: theme.font.family,
    letterSpacing: theme.font.letterSpacing,
    fontSize: '9px',
    lineHeight: '16px',
  },
  divider: {
    margin: theme.spacing(0.75, 0),
  },
  horizontalContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContent: {
    flexGrow: 1,
  },
  star: {
    color: theme.palette.primary.main,
    height: '10px',
    width: '10px',
  },
  timeContent: {
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
  timer: {
    color: theme.palette.onSurface.mediumEmphasis,
    height: '10px',
    width: '10px',
  }
}));

export default function RestaurantItemLarge({image, name, description, rating, timeToPrepare, averagePrice, onClick}) {
  const classes = useStyles();

  return (
    <Card elevation={0} className={classes.root} onClick={onClick}>
      <CardMedia
        className={classes.cover}
        image={image}
        title={name}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography className={classes.name}>{name}</Typography>
          <Typography className={classes.info}>{description}</Typography>
          <Divider variant='fullWidth' className={classes.divider}/>
          <div className={classes.horizontalContent}>
            <div className={`${classes.horizontalContent} ${classes.ratingContent}`}>
              <Star className={classes.star}/>
              <Typography className={classes.info}>{rating}</Typography>
            </div>
            <div className={`${classes.horizontalContent} ${classes.timeContent}`}>
              <AvTimer className={classes.timer}/>
              <Typography className={classes.info}>{`${timeToPrepare} phút`}</Typography>
            </div>
            <div className={`${classes.horizontalContent} ${classes.timeContent}`}>
              <CreditCard className={classes.timer}/>
              <Typography className={classes.info}>{`${averagePrice.toLocaleString()}đ/2 phần`}</Typography>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}