import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {LocationOn} from "@material-ui/icons";
import {Box, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: `absolute`,
    transform: `translate(-50%, -100%)`,
    display: `flex`,
    flexDirection: `column`,
    alignItems: "center",
    width: `max-content`,
    maxWidth: `95vw`,
  },
  icon: {
    fontSize: 45,
    color: theme.palette.primary.main,
  },
  textContainer: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
    boxShadow: theme.effect.dp10.boxShadow,
  },
  text: {
    fontSize: theme.spacing(1.75),
    color: theme.palette.onSurface.mediumEmphasis,
  }
}));

export default function MarkerComponent({address, isPending}) {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Paper variant="outlined" className={classes.textContainer}>
        <Typography variant="h4">
          <Box className={classes.text}>{address}</Box>
        </Typography>
      </Paper>
      <Box component={LocationOn} className={classes.icon}/>
    </Box>
  );
}