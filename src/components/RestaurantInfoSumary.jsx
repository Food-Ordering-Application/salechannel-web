import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Typography} from "@material-ui/core";
import Ribbon from "../features/common/Ribbon";
import {Link} from "react-router-dom";

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
      textAlign: `center`,
      color: theme.palette.onSurface.mediumEmphasis,
      maxHeight: theme.typography.body2.lineHeight,
      whiteSpace: 'nowrap',
      overflow: `hidden`,
      textOverflow: `ellipsis`,
    }
  })
);

export default function RestaurantInfoSumary({id, name, address, distance}) {
  const classes = useStyles();

  return (
    <Ribbon className={classes.root} component={Link} to={`/store/${id}/info`}>
      <Typography variant="h5">
        <Box textAlign={"center"} pb={0.5}>Nhà hàng</Box>
      </Typography>
      <Typography variant="h4">
        <Box textAlign="center">{name}</Box>
      </Typography>
      <Typography variant="body2" component="div">
        <Box className={classes.address}>{`${distance ? `${distance} km` : ''} ${address}`}</Box>
      </Typography>
    </Ribbon>
  );
}