import React from "react";
import {makeStyles, Typography} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: props => ({
      fontFamily: theme.font.family,
      color: theme.palette.onSurface.highEmphasis,
      textTransform: props.uppercase ? 'uppercase' : 'none',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '17px',
      letterSpacing: theme.font.letterSpacing,
    }),
  })
);

export default function Label({children, uppercase}) {
  const classes = useStyle({uppercase});

  return (
    <Typography className={classes.root}>
      {children}
    </Typography>
  );
}