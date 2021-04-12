import React from 'react';
import {GridListTile, Paper, Typography, makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      width: '75px',
      margin: theme.spacing(0, 1),
      '&:first-child': {
        marginLeft: theme.spacing(2),
      },
    },
    image: {
      borderRadius: '50%',
      width: '70px',
      height: '70px',
    },
    titlePaper: {
      backgroundColor: theme.palette.onSurface.highEmphasis,
      width: 'fit-content',
      textAlign: 'center',
      margin: theme.spacing(0, 'auto'),
      marginTop: '3px',
    },
    titleText: {
      margin: theme.spacing(0, 0.75),
      color: theme.palette.surface.light,
      fontFamily: theme.font.family,
      letterSpacing: theme.font.letterSpacing,
      fontWeight: 600,
      fontSize: '11px',
      lineHeight: '18px',
    }
  })
);

export default function CategoryItemMedium({key, image, name, onClick}) {
  const classes = useStyles();

  return (
    <GridListTile key={key} classes={{root: classes.root}} onClick={onClick}>
      <img className={classes.image} src={image} alt={name}/>
      <Paper className={classes.titlePaper} elevation={0}>
        <Typography className={classes.titleText}>
          {name}
        </Typography>
      </Paper>
    </GridListTile>
  );
}