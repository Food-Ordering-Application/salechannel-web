import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, Typography} from "@material-ui/core";
import Ribbon from "../features/common/Ribbon";
import {Link} from "react-router-dom";
import {numRateFormatter} from "./RestaurantItemLarge";
import {Star} from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
      width: `65%`,
      height: `max-content`,
      borderRadius: theme.spacing(1),
      margin: `auto`,
      padding: theme.spacing(2),
      boxShadow: `0px 4px 4px rgba(255, 107, 53, 0.1)`,
      backgroundColor: `white`,
    },
    address: {
      marginTop: theme.spacing(1),
      fontSize: "11px",
      textAlign: `center`,
      color: theme.palette.onSurface.mediumEmphasis,
      maxHeight: theme.typography.body2.lineHeight,
      whiteSpace: 'nowrap',
      overflow: `hidden`,
      textOverflow: `ellipsis`,
    },
    star: {
      fontSize: "12px",
      color: theme.palette.primary.main
    },
  })
);

export default function RestaurantInfoSumary({id, name, address, distance, rating, numRate}) {
  const classes = useStyles();

  return (
    <Ribbon className={classes.root} component={Link} to={`/store/${id}/info`}>
      <Typography variant="h5">
        <Box fontSize={12} textAlign={"center"} pb={0.5}>Nhà hàng</Box>
      </Typography>
      <Typography variant="h4">
        <Box textAlign="center">{name}</Box>
      </Typography>
      <Typography variant="h5" component="div">
        <Box className={classes.address}>{address}</Box>
      </Typography>
      {distance && (
        <Typography variant="h5">
          <Box fontSize={12} textAlign="center" mt={0.75}>
            {`${distance} km ● `}
          </Box>
        </Typography>
      )}
      {numRate && rating && (
        <Box pt={1}>
          <Grid container justify="center">
            <Grid item>
              <Star className={classes.star}/>
            </Grid>
            <Grid item>
              <Typography variant="h5">
                <Box fontSize={12}>
                  {rating && numRate && `${rating} ${numRateFormatter(rating)}`}
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      )}

    </Ribbon>
  );
}