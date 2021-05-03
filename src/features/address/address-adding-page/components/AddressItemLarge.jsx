import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import LocationIcon from "../../../../asserts/icons/Location";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(((theme) => ({
  root: {
    padding: theme.spacing(1, 0),
  }
})))

export default function AddressItemLarge({primaryText, secondaryText}) {
  const classes = useStyles();

  return (
    <Grid container alignItems="baseline" spacing={1} className={classes.root}>
      <Grid item>
        <Box fontSize={12} color="secondary.main" component={LocationIcon}/>
      </Grid>
      <Grid item xs>
        <Box>
          <Typography variant="h4">
            <Box fontSize={12} color="onSurface.highEmphasis" lineHeight="normal">{primaryText}</Box>
          </Typography>
        </Box>
        <Box pt={0.5}>
          <Typography variant="h6">
            <Box fontSize={10} color="onSurface.disabled" lineHeight="normal">{secondaryText}</Box>
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}