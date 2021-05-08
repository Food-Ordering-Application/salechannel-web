import React from "react";
import {Box, Button, Grid, Paper, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

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
    <Paper className={classes.root}>
      <Box p={1.5}>
        <Typography variant="h4">
          <Box fontSize={12} color="onSurface.mediumEmphasis">Giao đến</Box>
        </Typography>
        <Grid container alignItems="baseline" justify="space-between">
          <Grid item>
            <Typography variant="h3">
              <Box fontSize={18} color="onSurface.highEmphasis">{street}</Box>
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="text" color="primary">
              <Box fontSize={12} lineHeight="normal">Thay đổi</Box>
            </Button>
          </Grid>
        </Grid>
        <Typography variant="h6">
          <Box fontSize={11} color="onSurface.highEmphasis">{rest}</Box>
        </Typography>
        <Button variant="text">
          <Box p={0} fontSize={12} lineHeight="normal" fontWeight={300}>+ Thêm tên tòa nhà, tầng lầu, ...</Box>
        </Button>
      </Box>
    </Paper>
  );
}