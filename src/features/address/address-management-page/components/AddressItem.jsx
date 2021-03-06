import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Grid, IconButton, Paper, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(1),
    boxShadow: theme.effect.dp08.boxShadow,
    padding: theme.spacing(0, 1.5, 0, 1.5),
  },
  text: {
    lineHeight: `normal`,
    fontSize: theme.spacing(1.5),
    padding: theme.spacing(1, 0, 1, 0),
  },
  default: {
    color: theme.palette.primary.main,
  }
}));

export default function AddressItem({addressText, deleteAction, isDefault}) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="h4">
            <Box className={classes.text}>
              {addressText}
              {isDefault && (<span className={classes.default}> [Mặc định]</span>)}
            </Box>
          </Typography>
        </Grid>
        {
          deleteAction && !isDefault && (
            <Grid item>
              <IconButton disabled={isDefault} onClick={deleteAction}>
                <Delete color="disabled"/>
              </IconButton>
            </Grid>
          )
        }
      </Grid>
    </Paper>
  );
}