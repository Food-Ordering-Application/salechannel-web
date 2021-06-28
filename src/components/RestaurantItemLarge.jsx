import React from "react";
import {Card, CardContent, CardMedia, Divider, makeStyles, Typography} from "@material-ui/core";
import {Star} from "@material-ui/icons";
import PayPalIcon from "../asserts/icons/PayPalIcon";
import {calculateDistance} from "../helpers/location";

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
    fontSize: '12px',
    lineHeight: '16px',
  },
  info: {
    color: theme.palette.onSurface.disabled,
    fontFamily: theme.font.family,
    letterSpacing: theme.font.letterSpacing,
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontSize: '11px',
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
    height: '12px',
    width: '12px',
  },
  timeContent: {
    flexGrow: 2,
    justifyContent: 'flex-end',
  },
  timer: {
    // color: theme.palette.onSurface.mediumEmphasis,
    color: theme.palette.primary.main,
    height: '15px',
    width: '15px',
  },
  paypal: {
    color: theme.palette.primary.main,
    height: '15px',
    width: '15px',
  }
}));

const numRateFormatter = (numRate) => {
  if (!numRate || numRate < 15) {
    return ``
  } else {
    if (numRate >= 1000) {
      return ` (999+)`
    } else if (numRate >= 500) {
      return " (500+)"
    } else if (numRate >= 300) {
      return " (300+)"
    } else if (numRate >= 100) {
      return " (100+)"
    } else if (numRate >= 50) {
      return " (50+)"
    } else if (numRate >= 15) {
      return " (15+)"
    } else {
      return ""
    }
  }
}

export default function RestaurantItemLarge({
                                              image,
                                              name,
                                              description,
                                              rating = 0,
                                              timeToPrepare = 0,
                                              averagePrice = 0,
                                              location,
                                              customerLocation,
                                              onClick,
                                              paypalId,
                                              numRate = 0
                                            }) {
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
              <Typography className={classes.info}>
                <span>{rating}</span>
                <span>{numRateFormatter(numRate)}</span>
                {location && customerLocation && (
                  <span>{`  ●  ${(calculateDistance(location, customerLocation) / 1000).toFixed(1)} km`}</span>
                )}
              </Typography>
            </div>
            {/*{location && customerLocation && (*/}
            {/*  <div className={`${classes.horizontalContent} ${classes.timeContent}`}>*/}
            {/*    <LocationIcon className={classes.paypal}/>*/}
            {/*    <Typography*/}
            {/*      className={classes.info}>{`${(calculateDistance(location, customerLocation) / 1000).toFixed(1)} km`}</Typography>*/}
            {/*  </div>*/}
            {/*)}*/}
            {paypalId && (
              <div className={`${classes.horizontalContent} ${classes.timeContent}`}>
                <PayPalIcon className={classes.timer}/>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  );
}