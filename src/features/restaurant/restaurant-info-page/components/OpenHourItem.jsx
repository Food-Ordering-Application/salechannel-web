import React from "react";
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  text: ({highlighted}) => ({
    fontSize: theme.spacing(1.5),
    color: highlighted ? theme.palette.onSurface.default : theme.palette.onSurface.mediumEmphasis,
  })
}));

const padStart = (num) => String(num).padStart(2, '0')

export default function ({dayOfWeek, fromHour, fromMinute, toHour, toMinute, highlighted}) {
  const classes = useStyles({highlighted});

  return (
    <Grid container>
      <Grid item xs>
        <Typography variant={highlighted ? `h4` : `h5`}>
          <Box className={classes.text}>{dayOfWeek}</Box>
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant={highlighted ? `h4` : `h5`}>
          <Box className={classes.text}>
            {`${padStart(fromHour)}:${padStart(fromMinute)} - ${padStart(toHour)}:${padStart(toMinute)}`}
          </Box>
        </Typography>
      </Grid>
    </Grid>
  );
}