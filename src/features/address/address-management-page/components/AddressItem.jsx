import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {Delete, DeleteOutline} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp08.boxShadow,
    paddingLeft: theme.spacing(2),
  },
  text: {
    lineHeight: `normal`,
    fontSize: theme.spacing(1.5),
  },
}));

export default function AddressItem({addressText, deleteAction}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="h4">
            <Box className={classes.text}>{addressText}</Box>
          </Typography>
        </Grid>
        <Grid item>
          <IconButton className={classes.button} onClick={deleteAction}>
            <Delete color="disabled"/>
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
}