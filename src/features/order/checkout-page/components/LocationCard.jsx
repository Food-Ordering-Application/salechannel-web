import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Ribbon from "../../../common/Ribbon";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: theme.effect.dp00.boxShadow,
    borderRadius: theme.spacing(1),
  }
}));


export default function LocationCard({location, handleChange}) {
  const str = `${location}`;
  const street = str.split(',')[0];
  const rest = str.slice(street.length + 1);
  const classes = useStyles();

  return (
    <Ribbon className={classes.root} onClick={handleChange}>
      {/*Location is null*/}
      <Box p={1.5} hidden={location}>
        <Typography variant="h4">
          <Box fontSize={14} color="primary.main">Chọn địa chỉ giao hàng</Box>
        </Typography>
      </Box>

      {/*Location is not null*/}
      <Box p={1.5} hidden={!location}>
        <Typography variant="h4">
          <Box fontSize={12} color="onSurface.mediumEmphasis">Giao đến</Box>
        </Typography>
        <Grid container alignItems="flex-start" justify="space-between">
          <Grid item>
            <Typography variant="h3">
              <Box fontSize={18} color="onSurface.highEmphasis">{street}</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h4">
              <Box fontSize={12} lineHeight="normal" color={"primary.main"}>Thay đổi</Box>
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h6">
          <Box fontSize={11} color="onSurface.highEmphasis">{rest}</Box>
        </Typography>
      </Box>
    </Ribbon>
  );
}