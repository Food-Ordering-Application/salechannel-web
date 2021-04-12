import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Box, Card, CardContent, CardMedia, Divider, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
      padding: theme.spacing(0.5, 0),
      '&:first-child': {
        paddingTop: theme.spacing(1),
      },
    },
    root: {
      display: 'flex',
      height: '82px',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
    },
    content: {
      flex: '1 0 auto',
      padding: theme.spacing(2, 2, 2, 0),
    },
    cover: {
      minWidth: '82px',
      borderRadius: '4px',
    },
    name: {
      fontSize: '11px',
      lineHeight: '16px',
    },
    info: {
      fontSize: '9px',
      lineHeight: '16px',
      color: theme.palette.onSurface.disabled,
    },
    divider: {
      margin: theme.spacing(0.5, 0),
    },
  })
);

export default function ProductItemLarge({image, name, description, price, onClick}) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Card elevation={0} className={classes.root} onClick={onClick}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography variant="h5">
              <Box className={classes.name}>{name}</Box>
            </Typography>
            <Typography variant="h6">
              <Box className={classes.info}>{description}</Box>
            </Typography>
            <Divider variant='fullWidth' className={classes.divider}/>
            <Typography variant="h6">
              <Box className={classes.name}>{price.toLocaleString()}đ</Box>
            </Typography>
          </CardContent>
        </div>
        <CardMedia
          className={classes.cover}
          image={image}
          title={name}
        />
      </Card>
    </div>
  );
}